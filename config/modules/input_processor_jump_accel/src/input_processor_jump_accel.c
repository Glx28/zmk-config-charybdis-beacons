/*
 * Copyright (c) 2026 The Charybdis Contributors
 *
 * SPDX-License-Identifier: MIT
 */

#define DT_DRV_COMPAT zmk_input_processor_jump_accel

#include <errno.h>
#include <zephyr/kernel.h>
#include <zephyr/device.h>
#include <zephyr/spinlock.h>
#include <drivers/input_processor.h>

#include <zephyr/logging/log.h>

#include "jump_accel_tune.h"

LOG_MODULE_DECLARE(zmk, CONFIG_ZMK_LOG_LEVEL);

struct jump_accel_config {
    int32_t base_factor;
    int32_t fast_factor;
    int32_t jump_start_cps;
    int32_t jump_width_cps;
    int32_t curve_type;
    int32_t speed_smoothing_ms;
    int32_t velocity_window_ms;
    int32_t distance_window_ms;
    int32_t distance_start_counts;
    int32_t distance_width_counts;
    int32_t gain_smoothing_ms;
};

enum jump_accel_curve_type {
    JUMP_ACCEL_CURVE_SMOOTHERSTEP = 0,
    JUMP_ACCEL_CURVE_EXPONENTIAL = 1,
    JUMP_ACCEL_CURVE_HOCKEY_STICK = 2,
};

static int32_t smootherstep_x1000(int32_t t_x1000);
static int32_t exponential_x1000(int32_t t_x1000);
static int32_t hockey_stick_x1000(int32_t t_x1000);

/* Legacy per-axis timestamps. The vector-window path below uses the input
 * sync flag to assemble one X/Y sample before estimating speed. */
#define JUMP_ACCEL_MAX_DT_MS 100
#define JUMP_ACCEL_AXIS_STALE_MS 12
#define JUMP_ACCEL_HISTORY_SIZE 64
#define JUMP_ACCEL_SENSOR_SAMPLE_MS 4

struct jump_accel_sample {
    int64_t timestamp_ms;
    int16_t dx;
    int16_t dy;
};

struct jump_accel_data {
    struct k_spinlock tuning_lock;
    struct jump_accel_config runtime;
    struct jump_accel_config defaults;
    uint32_t runtime_generation;
    uint32_t state_generation;
    int32_t last_dx;
    int32_t last_dy;
    int64_t last_ts_x_ms;
    int64_t last_ts_y_ms;
    int64_t last_motion_ts_ms;
    int64_t last_vector_ts_ms;
    int32_t filtered_speed_cps;
    int32_t filtered_factor_x1000;
    int64_t pending_vector_ts_ms;
    int32_t pending_dx;
    int32_t pending_dy;
    int32_t pending_out_dx;
    int32_t pending_out_dy;
    int32_t pending_factor_x1000;
    bool pending_vector;
    int64_t diag_window_start_ms;
    int64_t diag_last_sample_ms;
    uint32_t diag_samples;
    uint32_t diag_raw_path;
    uint32_t diag_output_path;
    uint32_t diag_max_gap_ms;
    int32_t diag_current_speed_cps;
    int32_t diag_current_distance_counts;
    int32_t diag_current_gain_x1000;
    int32_t diag_min_speed_cps;
    int32_t diag_max_speed_cps;
    int32_t diag_max_distance_counts;
    int32_t diag_min_gain_x1000;
    int32_t diag_max_gain_x1000;
    struct jump_accel_sample history[JUMP_ACCEL_HISTORY_SIZE];
    uint8_t history_head;
    uint8_t history_count;
};

static uint32_t get_runtime_config(struct jump_accel_data *data,
                                   struct jump_accel_config *config) {
    k_spinlock_key_t key = k_spin_lock(&data->tuning_lock);
    *config = data->runtime;
    uint32_t generation = data->runtime_generation;
    k_spin_unlock(&data->tuning_lock, key);
    return generation;
}

/* Integer sqrt (Zephyr has no libc sqrt available in-kernel by default). */
static uint32_t isqrt32(uint32_t n) {
    uint32_t res = 0;
    uint32_t bit = 1u << 30;

    while (bit > n) {
        bit >>= 2;
    }

    while (bit != 0) {
        if (n >= res + bit) {
            n -= res + bit;
            res = (res >> 1) + bit;
        } else {
            res >>= 1;
        }
        bit >>= 2;
    }

    return res;
}

/* Estimate speed from the sum of complete per-sample vector distances.
 * Summing X/Y totals first underestimates curved paths; sum hypot(dx, dy) for
 * each synchronized PMW3610 sample instead. */
static int32_t history_speed_cps(struct jump_accel_data *data, int32_t dx, int32_t dy,
                                 int64_t now, int32_t window_ms, int32_t distance_window_ms,
                                 int32_t *distance_counts) {
    int32_t reset_window_ms = MAX(window_ms, distance_window_ms);
    if (data->last_motion_ts_ms > 0 && now - data->last_motion_ts_ms > reset_window_ms) {
        data->history_head = 0;
        data->history_count = 0;
        data->filtered_speed_cps = 0;
    }
    data->last_motion_ts_ms = now;

    struct jump_accel_sample *sample = &data->history[data->history_head];
    sample->timestamp_ms = now;
    sample->dx = (int16_t)CLAMP(dx, INT16_MIN, INT16_MAX);
    sample->dy = (int16_t)CLAMP(dy, INT16_MIN, INT16_MAX);
    data->history_head = (data->history_head + 1) % JUMP_ACCEL_HISTORY_SIZE;
    if (data->history_count < JUMP_ACCEL_HISTORY_SIZE) {
        data->history_count++;
    }

    int64_t cutoff = now - window_ms;
    int64_t distance_cutoff = now - distance_window_ms;
    int64_t first_timestamp_ms = now;
    int32_t path = 0;
    int32_t distance_path = 0;
    for (uint8_t i = 0; i < data->history_count; i++) {
        uint8_t index = (data->history_head + JUMP_ACCEL_HISTORY_SIZE - data->history_count + i) %
                        JUMP_ACCEL_HISTORY_SIZE;
        const struct jump_accel_sample *item = &data->history[index];
        uint32_t sample_squared = (uint32_t)((int32_t)item->dx * item->dx) +
                                  (uint32_t)((int32_t)item->dy * item->dy);
        int32_t sample_distance = isqrt32(sample_squared);
        if (item->timestamp_ms >= distance_cutoff) {
            distance_path += sample_distance;
        }
        if (item->timestamp_ms >= cutoff) {
            if (item->timestamp_ms < first_timestamp_ms) {
                first_timestamp_ms = item->timestamp_ms;
            }
            path += sample_distance;
        }
    }
    *distance_counts = distance_path;

    /* A first motion packet already represents one sensor sample interval.
     * Count it immediately so a short, fast flick does not get treated as
     * slow simply because the rolling window has not filled yet. */
    int64_t elapsed_ms = now - first_timestamp_ms + JUMP_ACCEL_SENSOR_SAMPLE_MS;

    return (int32_t)(((int64_t)path * 1000) / elapsed_ms);
}

/* One low-rate summary per second lets a Motion Lab test distinguish poor
 * curve response from missing input events without logging every sample. */
static void log_motion_window(struct jump_accel_data *data, int32_t raw_dx, int32_t raw_dy,
                              int32_t out_dx, int32_t out_dy, int64_t now) {
    if (data->diag_last_sample_ms > 0) {
        int64_t gap = now - data->diag_last_sample_ms;
        uint32_t gap_ms = gap > UINT32_MAX ? UINT32_MAX : (uint32_t)gap;
        data->diag_max_gap_ms = MAX(data->diag_max_gap_ms, gap_ms);
    }
    data->diag_last_sample_ms = now;
    if (data->diag_window_start_ms == 0) {
        data->diag_window_start_ms = now;
    }
    if (data->diag_samples == 0) {
        data->diag_min_speed_cps = data->diag_current_speed_cps;
        data->diag_min_gain_x1000 = data->diag_current_gain_x1000;
    } else {
        data->diag_min_speed_cps = MIN(data->diag_min_speed_cps, data->diag_current_speed_cps);
        data->diag_min_gain_x1000 = MIN(data->diag_min_gain_x1000, data->diag_current_gain_x1000);
    }
    data->diag_samples++;
    data->diag_max_speed_cps = MAX(data->diag_max_speed_cps, data->diag_current_speed_cps);
    data->diag_max_distance_counts = MAX(data->diag_max_distance_counts,
                                         data->diag_current_distance_counts);
    data->diag_max_gain_x1000 = MAX(data->diag_max_gain_x1000, data->diag_current_gain_x1000);
    uint64_t raw_squared = (int64_t)raw_dx * raw_dx + (int64_t)raw_dy * raw_dy;
    uint64_t out_squared = (int64_t)out_dx * out_dx + (int64_t)out_dy * out_dy;
    data->diag_raw_path += isqrt32((uint32_t)MIN(raw_squared, UINT32_MAX));
    data->diag_output_path += isqrt32((uint32_t)MIN(out_squared, UINT32_MAX));

    if (now - data->diag_window_start_ms < 1000) {
        return;
    }

    LOG_INF("trackball input: samples=%u raw_path=%u output_path=%u max_gap_ms=%u speed_cps=%d..%d distance_max=%d gain_x1000=%d..%d",
            data->diag_samples, data->diag_raw_path, data->diag_output_path,
            data->diag_max_gap_ms, data->diag_min_speed_cps, data->diag_max_speed_cps,
            data->diag_max_distance_counts, data->diag_min_gain_x1000,
            data->diag_max_gain_x1000);
    data->diag_window_start_ms = now;
    data->diag_samples = 0;
    data->diag_raw_path = 0;
    data->diag_output_path = 0;
    data->diag_max_gap_ms = 0;
    data->diag_max_speed_cps = 0;
    data->diag_max_distance_counts = 0;
    data->diag_min_gain_x1000 = 0;
    data->diag_max_gain_x1000 = 0;
}

static int32_t factor_for_speed(const struct jump_accel_config *cfg, int32_t speed_cps,
                                int32_t distance_counts) {
    int32_t t_x1000;
    if (cfg->jump_width_cps > 0) {
        t_x1000 = (int32_t)(((int64_t)(speed_cps - cfg->jump_start_cps) * 1000) /
                            cfg->jump_width_cps);
    } else {
        t_x1000 = speed_cps >= cfg->jump_start_cps ? 1000 : 0;
    }

    int32_t eased_x1000;
    switch (cfg->curve_type) {
    case JUMP_ACCEL_CURVE_EXPONENTIAL:
        eased_x1000 = exponential_x1000(t_x1000);
        break;
    case JUMP_ACCEL_CURVE_HOCKEY_STICK:
        eased_x1000 = hockey_stick_x1000(t_x1000);
        break;
    default:
        eased_x1000 = smootherstep_x1000(t_x1000);
        break;
    }
    if (cfg->distance_window_ms > 0 && cfg->distance_width_counts > 0) {
        int32_t distance_t_x1000 = (int32_t)(((int64_t)(distance_counts - cfg->distance_start_counts) * 1000) /
                                             cfg->distance_width_counts);
        int32_t distance_gate_x1000 = smootherstep_x1000(distance_t_x1000);
        eased_x1000 = (int32_t)(((int64_t)eased_x1000 * distance_gate_x1000) / 1000);
    }
    return cfg->base_factor +
           (int32_t)(((int64_t)(cfg->fast_factor - cfg->base_factor) * eased_x1000) / 1000);
}

static int32_t smooth_factor(const struct jump_accel_config *cfg, struct jump_accel_data *data,
                             int32_t target_x1000, int32_t dt_ms) {
    if (cfg->gain_smoothing_ms <= 0) {
        data->filtered_factor_x1000 = target_x1000;
        return target_x1000;
    }

    if (data->filtered_factor_x1000 == 0) {
        data->filtered_factor_x1000 = cfg->base_factor;
    }
    int32_t alpha_x1000 = (int32_t)(((int64_t)dt_ms * 1000) /
                                    (cfg->gain_smoothing_ms + dt_ms));
    data->filtered_factor_x1000 +=
        (int32_t)(((int64_t)(target_x1000 - data->filtered_factor_x1000) * alpha_x1000) / 1000);
    return data->filtered_factor_x1000;
}

static void update_vector_gain(const struct jump_accel_config *cfg, struct jump_accel_data *data,
                               int32_t dx, int32_t dy, int64_t sample_ts_ms) {
    int32_t distance_counts = 0;
    int32_t speed_cps = history_speed_cps(data, dx, dy, sample_ts_ms,
                                          cfg->velocity_window_ms,
                                          cfg->distance_window_ms, &distance_counts);
    int64_t elapsed = data->last_vector_ts_ms > 0 ? sample_ts_ms - data->last_vector_ts_ms
                                                   : JUMP_ACCEL_SENSOR_SAMPLE_MS;
    if (elapsed <= 0) {
        elapsed = JUMP_ACCEL_SENSOR_SAMPLE_MS;
    } else if (elapsed > JUMP_ACCEL_MAX_DT_MS) {
        elapsed = JUMP_ACCEL_MAX_DT_MS;
    }
    data->last_vector_ts_ms = sample_ts_ms;

    if (cfg->speed_smoothing_ms > 0) {
        int32_t alpha_x1000 = (int32_t)((elapsed * 1000) /
                                        (cfg->speed_smoothing_ms + elapsed));
        data->filtered_speed_cps +=
            (int32_t)(((int64_t)(speed_cps - data->filtered_speed_cps) * alpha_x1000) / 1000);
        speed_cps = data->filtered_speed_cps;
    }
    data->diag_current_speed_cps = speed_cps;
    data->diag_current_distance_counts = distance_counts;
    data->diag_current_gain_x1000 =
        smooth_factor(cfg, data, factor_for_speed(cfg, speed_cps, distance_counts),
                      (int32_t)elapsed);
}

static int handle_vector_event(const struct jump_accel_config *cfg,
                               struct jump_accel_data *data, struct input_event *event,
                               struct zmk_input_processor_state *state) {
    int64_t now = k_uptime_get();

    /* A missing sync event must not leave one axis pending indefinitely. */
    if (data->pending_vector && now - data->pending_vector_ts_ms > JUMP_ACCEL_AXIS_STALE_MS) {
        data->pending_vector = false;
        data->pending_dx = data->pending_dy = 0;
        data->pending_out_dx = data->pending_out_dy = 0;
    }
    if (!data->pending_vector) {
        if (data->last_motion_ts_ms == 0 ||
            now - data->last_motion_ts_ms > MAX(cfg->velocity_window_ms,
                                                cfg->distance_window_ms)) {
            data->history_head = 0;
            data->history_count = 0;
            data->filtered_speed_cps = 0;
            data->last_vector_ts_ms = 0;
            data->filtered_factor_x1000 = cfg->base_factor;
        }
        data->pending_vector = true;
        data->pending_vector_ts_ms = now;
        data->pending_dx = data->pending_dy = 0;
        data->pending_out_dx = data->pending_out_dy = 0;
        data->pending_factor_x1000 = data->filtered_factor_x1000 != 0
                                         ? data->filtered_factor_x1000
                                         : cfg->base_factor;
    }

    if (event->code == INPUT_REL_X) {
        data->pending_dx += event->value;
    } else {
        data->pending_dy += event->value;
    }

    /* Both axes in one Zephyr sync group use the same gain. Compute the next
     * gain only after the complete sample is available; one sensor sample of
     * latency is bounded to the PMW3610 reporting interval. */
    int32_t factor_x1000 = data->pending_factor_x1000;
    int32_t value_scaled = (int32_t)event->value * factor_x1000;
    if (state && state->remainder) {
        value_scaled += *state->remainder;
    }
    int32_t out = value_scaled / 1000;
    if (out > INT16_MAX) {
        out = INT16_MAX;
        if (state && state->remainder) {
            *state->remainder = 0;
        }
    } else if (out < INT16_MIN) {
        out = INT16_MIN;
        if (state && state->remainder) {
            *state->remainder = 0;
        }
    } else if (state && state->remainder) {
        *state->remainder = (int16_t)(value_scaled - out * 1000);
    }
    event->value = (int16_t)out;
    if (event->code == INPUT_REL_X) {
        data->pending_out_dx += out;
    } else {
        data->pending_out_dy += out;
    }

    if (event->sync) {
        update_vector_gain(cfg, data, data->pending_dx, data->pending_dy,
                           data->pending_vector_ts_ms);
        log_motion_window(data, data->pending_dx, data->pending_dy,
                          data->pending_out_dx, data->pending_out_dy,
                          data->pending_vector_ts_ms);
        data->pending_vector = false;
        data->pending_dx = data->pending_dy = 0;
        data->pending_out_dx = data->pending_out_dy = 0;
    }
    return ZMK_INPUT_PROC_CONTINUE;
}

/* Smootherstep (Perlin), fixed-point x1000 in, x1000 out. Flat tangents at
 * both ends so the curve blends into base-factor/fast-factor with no kink. */
static int32_t smootherstep_x1000(int32_t t_x1000) {
    if (t_x1000 <= 0) {
        return 0;
    }
    if (t_x1000 >= 1000) {
        return 1000;
    }

    int64_t t = t_x1000;
    int64_t t2 = t * t / 1000;
    int64_t t3 = t2 * t / 1000;
    int64_t t4 = t3 * t / 1000;
    int64_t t5 = t4 * t / 1000;

    return (int32_t)(6 * t5 - 15 * t4 + 10 * t3);
}

/* Normalized exponential ease-in: (2^(4t) - 1) / 15, fixed-point x1000.
 * A 1/16-step LUT avoids floating point and keeps firmware cost small. */
static int32_t exponential_x1000(int32_t t_x1000) {
    static const int16_t values[17] = {
        0, 13, 28, 45, 67, 92, 122, 158, 200, 250, 310, 382, 467, 568, 688, 830, 1000,
    };
    if (t_x1000 <= 0) {
        return 0;
    }
    if (t_x1000 >= 1000) {
        return 1000;
    }

    int32_t scaled = t_x1000 * 16;
    int32_t index = scaled / 1000;
    int32_t remainder = scaled - index * 1000;
    int32_t lower = values[index];
    int32_t upper = values[index + 1];
    return lower + ((upper - lower) * remainder) / 1000;
}

/* Hockey-stick response. Rescaled through the upper-middle so the previous
 * medium-speed gain is retained with the lower fast-factor; the final stages
 * ease into the new cap, reducing near-maximum cursor travel by about half.
 * Interpolation avoids hard jumps; no floating point needed. */
static int32_t hockey_stick_x1000(int32_t t_x1000) {
    static const int16_t stages[33] = {
        0, 0, 3, 5, 11, 16, 24, 35, 49, 65, 87,
        114, 146, 184, 230, 284, 352, 433, 528, 636, 771,
        934, 975, 995, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
    };
    if (t_x1000 <= 0) {
        return 0;
    }
    if (t_x1000 >= 1000) {
        return 1000;
    }

    int32_t scaled = t_x1000 * 32;
    int32_t index = scaled / 1000;
    int32_t remainder = scaled - index * 1000;
    int32_t lower = stages[index];
    int32_t upper = stages[index + 1];
    return lower + ((upper - lower) * remainder) / 1000;
}

static int jump_accel_handle_event(const struct device *dev, struct input_event *event,
                                   uint32_t param1, uint32_t param2,
                                   struct zmk_input_processor_state *state) {
    if (event->type != INPUT_EV_REL ||
        (event->code != INPUT_REL_X && event->code != INPUT_REL_Y)) {
        return ZMK_INPUT_PROC_CONTINUE;
    }

    struct jump_accel_data *data = dev->data;
    struct jump_accel_config runtime;
    uint32_t generation = get_runtime_config(data, &runtime);
    const struct jump_accel_config *cfg = &runtime;
    if (generation != data->state_generation) {
        data->state_generation = generation;
        data->history_head = data->history_count = 0;
        data->last_motion_ts_ms = data->last_vector_ts_ms = 0;
        data->last_ts_x_ms = data->last_ts_y_ms = 0;
        data->filtered_speed_cps = 0;
        data->filtered_factor_x1000 = cfg->base_factor;
        data->pending_vector = false;
        data->pending_dx = data->pending_dy = 0;
        data->pending_out_dx = data->pending_out_dy = 0;
        data->diag_window_start_ms = 0;
        data->diag_last_sample_ms = 0;
        data->diag_samples = 0;
        data->diag_raw_path = 0;
        data->diag_output_path = 0;
        data->diag_max_gap_ms = 0;
        data->diag_max_speed_cps = 0;
        data->diag_max_distance_counts = 0;
        data->diag_min_gain_x1000 = 0;
        data->diag_max_gain_x1000 = 0;
    }

    if (cfg->velocity_window_ms > 0 || cfg->distance_window_ms > 0) {
        return handle_vector_event(cfg, data, event, state);
    }

    int64_t now = k_uptime_get();
    if (data->last_motion_ts_ms == 0 ||
        (cfg->velocity_window_ms > 0 &&
         now - data->last_motion_ts_ms > cfg->velocity_window_ms)) {
        data->filtered_factor_x1000 = cfg->base_factor;
    }
    int64_t *last_ts_ms = (event->code == INPUT_REL_X) ? &data->last_ts_x_ms : &data->last_ts_y_ms;
    int64_t dt_ms = (*last_ts_ms > 0) ? (now - *last_ts_ms) : 1;
    if (dt_ms <= 0) {
        dt_ms = 1;
    } else if (dt_ms > JUMP_ACCEL_MAX_DT_MS) {
        dt_ms = JUMP_ACCEL_MAX_DT_MS;
    }
    *last_ts_ms = now;

    /* Retain the latest axis deltas for the legacy scroll curve. The pointer
     * curve uses a multi-event history below. */
    if (event->code == INPUT_REL_X) {
        data->last_dx = event->value;
    } else {
        data->last_dy = event->value;
    }

    int32_t dx = data->last_dx;
    int32_t dy = data->last_dy;
    if (cfg->speed_smoothing_ms > 0) {
        if (now - data->last_ts_x_ms > JUMP_ACCEL_AXIS_STALE_MS) {
            dx = 0;
        }
        if (now - data->last_ts_y_ms > JUMP_ACCEL_AXIS_STALE_MS) {
            dy = 0;
        }
    }
    uint32_t mag_sq = (uint32_t)(dx * dx) + (uint32_t)(dy * dy);
    uint32_t mag = isqrt32(mag_sq);
    int32_t speed_cps = (int32_t)(((int64_t)mag * 1000) / dt_ms);

    if (cfg->speed_smoothing_ms > 0) {
        int32_t alpha_x1000 = (int32_t)((dt_ms * 1000) / (cfg->speed_smoothing_ms + dt_ms));
        data->filtered_speed_cps +=
            (int32_t)(((int64_t)(speed_cps - data->filtered_speed_cps) * alpha_x1000) / 1000);
        speed_cps = data->filtered_speed_cps;
    }

    int32_t t_x1000;
    if (cfg->jump_width_cps > 0) {
        t_x1000 = (int32_t)(((int64_t)(speed_cps - cfg->jump_start_cps) * 1000) /
                           cfg->jump_width_cps);
    } else {
        t_x1000 = speed_cps >= cfg->jump_start_cps ? 1000 : 0;
    }

    int32_t eased_x1000;
    switch (cfg->curve_type) {
    case JUMP_ACCEL_CURVE_EXPONENTIAL:
        eased_x1000 = exponential_x1000(t_x1000);
        break;
    case JUMP_ACCEL_CURVE_HOCKEY_STICK:
        eased_x1000 = hockey_stick_x1000(t_x1000);
        break;
    default:
        eased_x1000 = smootherstep_x1000(t_x1000);
        break;
    }
    int32_t factor_x1000 =
        cfg->base_factor +
        (int32_t)(((int64_t)(cfg->fast_factor - cfg->base_factor) * eased_x1000) / 1000);

    /* Smooth gain itself as well as speed. This prevents medium-speed sensor
     * variation from changing each output packet's multiplier visibly. */
    if (cfg->gain_smoothing_ms > 0) {
        if (data->filtered_factor_x1000 == 0) {
            data->filtered_factor_x1000 = cfg->base_factor;
        }
        int32_t alpha_x1000 = (int32_t)((dt_ms * 1000) /
                                        (cfg->gain_smoothing_ms + dt_ms));
        data->filtered_factor_x1000 +=
            (int32_t)(((int64_t)(factor_x1000 - data->filtered_factor_x1000) * alpha_x1000) /
                      1000);
        factor_x1000 = data->filtered_factor_x1000;
    }

    int32_t value_scaled = (int32_t)event->value * factor_x1000;
    if (state && state->remainder) {
        value_scaled += *state->remainder;
    }

    int32_t out = value_scaled / 1000;
    if (out > INT16_MAX) {
        out = INT16_MAX;
        if (state && state->remainder) {
            *state->remainder = 0;
        }
    } else if (out < INT16_MIN) {
        out = INT16_MIN;
        if (state && state->remainder) {
            *state->remainder = 0;
        }
    } else if (state && state->remainder) {
        *state->remainder = (int16_t)(value_scaled - out * 1000);
    }

    event->value = (int16_t)out;

    return ZMK_INPUT_PROC_CONTINUE;
}

static struct zmk_input_processor_driver_api jump_accel_driver_api = {
    .handle_event = jump_accel_handle_event,
};

enum jump_accel_tune_action {
    TUNE_BASE_DOWN = 0,
    TUNE_BASE_UP,
    TUNE_FAST_DOWN,
    TUNE_FAST_UP,
    TUNE_START_DOWN,
    TUNE_START_UP,
    TUNE_WIDTH_DOWN,
    TUNE_WIDTH_UP,
    TUNE_WINDOW_DOWN,
    TUNE_WINDOW_UP,
    TUNE_SPEED_FILTER_DOWN,
    TUNE_SPEED_FILTER_UP,
    TUNE_GAIN_FILTER_DOWN,
    TUNE_GAIN_FILTER_UP,
    TUNE_DISTANCE_WINDOW_DOWN,
    TUNE_DISTANCE_WINDOW_UP,
    TUNE_DISTANCE_START_DOWN,
    TUNE_DISTANCE_START_UP,
    TUNE_DISTANCE_WIDTH_DOWN,
    TUNE_DISTANCE_WIDTH_UP,
    TUNE_RESET,
};

int jump_accel_tune(const struct device *dev, uint8_t action) {
    if (dev == NULL || !device_is_ready(dev)) {
        return -ENODEV;
    }
    struct jump_accel_data *data = dev->data;
    if (data == NULL) {
        return -EINVAL;
    }

    k_spinlock_key_t key = k_spin_lock(&data->tuning_lock);
    struct jump_accel_config *cfg = &data->runtime;
    switch (action) {
    case TUNE_BASE_DOWN: cfg->base_factor = MAX(250, cfg->base_factor - 100); break;
    case TUNE_BASE_UP: cfg->base_factor = MIN(MIN(4000, cfg->fast_factor), cfg->base_factor + 100); break;
    case TUNE_FAST_DOWN: cfg->fast_factor = MAX(cfg->base_factor, cfg->fast_factor - 100); break;
    case TUNE_FAST_UP: cfg->fast_factor = MIN(10000, cfg->fast_factor + 100); break;
    case TUNE_START_DOWN: cfg->jump_start_cps = MAX(100, cfg->jump_start_cps - 100); break;
    case TUNE_START_UP: cfg->jump_start_cps = MIN(10000, cfg->jump_start_cps + 100); break;
    case TUNE_WIDTH_DOWN: cfg->jump_width_cps = MAX(100, cfg->jump_width_cps - 100); break;
    case TUNE_WIDTH_UP: cfg->jump_width_cps = MIN(20000, cfg->jump_width_cps + 100); break;
    case TUNE_WINDOW_DOWN: cfg->velocity_window_ms = MAX(8, cfg->velocity_window_ms - 4); break;
    case TUNE_WINDOW_UP: cfg->velocity_window_ms = MIN(80, cfg->velocity_window_ms + 4); break;
    case TUNE_SPEED_FILTER_DOWN: cfg->speed_smoothing_ms = MAX(0, cfg->speed_smoothing_ms - 4); break;
    case TUNE_SPEED_FILTER_UP: cfg->speed_smoothing_ms = MIN(100, cfg->speed_smoothing_ms + 4); break;
    case TUNE_GAIN_FILTER_DOWN: cfg->gain_smoothing_ms = MAX(0, cfg->gain_smoothing_ms - 4); break;
    case TUNE_GAIN_FILTER_UP: cfg->gain_smoothing_ms = MIN(100, cfg->gain_smoothing_ms + 4); break;
    case TUNE_DISTANCE_WINDOW_DOWN: cfg->distance_window_ms = MAX(24, cfg->distance_window_ms - 8); break;
    case TUNE_DISTANCE_WINDOW_UP: cfg->distance_window_ms = MIN(200, cfg->distance_window_ms + 8); break;
    case TUNE_DISTANCE_START_DOWN: cfg->distance_start_counts = MAX(0, cfg->distance_start_counts - 16); break;
    case TUNE_DISTANCE_START_UP: cfg->distance_start_counts = MIN(5000, cfg->distance_start_counts + 16); break;
    case TUNE_DISTANCE_WIDTH_DOWN: cfg->distance_width_counts = MAX(16, cfg->distance_width_counts - 16); break;
    case TUNE_DISTANCE_WIDTH_UP: cfg->distance_width_counts = MIN(5000, cfg->distance_width_counts + 16); break;
    case TUNE_RESET: *cfg = data->defaults; break;
    default:
        k_spin_unlock(&data->tuning_lock, key);
        return -EINVAL;
    }
    struct jump_accel_config snapshot = *cfg;
    data->runtime_generation++;
    k_spin_unlock(&data->tuning_lock, key);

    LOG_INF("%s tune: base=%d fast=%d start=%d width=%d window=%d dist_window=%d dist_start=%d dist_width=%d speed_filter=%d gain_filter=%d",
            dev->name, snapshot.base_factor, snapshot.fast_factor, snapshot.jump_start_cps,
            snapshot.jump_width_cps, snapshot.velocity_window_ms, snapshot.distance_window_ms,
            snapshot.distance_start_counts, snapshot.distance_width_counts,
            snapshot.speed_smoothing_ms, snapshot.gain_smoothing_ms);
    return 0;
}

#define JUMP_ACCEL_CONFIG_INIT(n)                                                                  \
    {                                                                                              \
        .base_factor = DT_INST_PROP(n, base_factor),                                               \
        .fast_factor = DT_INST_PROP(n, fast_factor),                                               \
        .jump_start_cps = DT_INST_PROP(n, jump_start_cps),                                         \
        .jump_width_cps = DT_INST_PROP(n, jump_width_cps),                                         \
        .curve_type = DT_INST_ENUM_IDX(n, curve_type),                                             \
        .speed_smoothing_ms = DT_INST_PROP(n, speed_smoothing_ms),                                 \
        .velocity_window_ms = DT_INST_PROP(n, velocity_window_ms),                                 \
        .distance_window_ms = DT_INST_PROP(n, distance_window_ms),                                 \
        .distance_start_counts = DT_INST_PROP(n, distance_start_counts),                           \
        .distance_width_counts = DT_INST_PROP(n, distance_width_counts),                           \
        .gain_smoothing_ms = DT_INST_PROP(n, gain_smoothing_ms),                                   \
    }

#define JUMP_ACCEL_INST(n)                                                                         \
    static struct jump_accel_data jump_accel_data_##n = {                                          \
        .runtime = JUMP_ACCEL_CONFIG_INIT(n), .defaults = JUMP_ACCEL_CONFIG_INIT(n),               \
    };                                                                                             \
    DEVICE_DT_INST_DEFINE(n, NULL, NULL, &jump_accel_data_##n, NULL, POST_KERNEL,                  \
                          CONFIG_KERNEL_INIT_PRIORITY_DEFAULT, &jump_accel_driver_api);

DT_INST_FOREACH_STATUS_OKAY(JUMP_ACCEL_INST)
