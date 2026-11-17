/*
 * Copyright (c) 2026 The Charybdis Contributors
 *
 * SPDX-License-Identifier: MIT
 */

#define DT_DRV_COMPAT zmk_input_processor_jump_accel

#include <zephyr/kernel.h>
#include <zephyr/device.h>
#include <drivers/input_processor.h>

#include <zephyr/logging/log.h>

LOG_MODULE_DECLARE(zmk, CONFIG_ZMK_LOG_LEVEL);

struct jump_accel_config {
    int32_t base_factor;
    int32_t fast_factor;
    int32_t jump_start_cps;
    int32_t jump_width_cps;
    int32_t curve_type;
    int32_t speed_smoothing_ms;
    int32_t velocity_window_ms;
    int32_t gain_smoothing_ms;
};

enum jump_accel_curve_type {
    JUMP_ACCEL_CURVE_SMOOTHERSTEP = 0,
    JUMP_ACCEL_CURVE_EXPONENTIAL = 1,
    JUMP_ACCEL_CURVE_HOCKEY_STICK = 2,
};

/* Per-axis timestamps (not one shared clock) -- PMW3610 reports X then Y as
 * two separate events within the same ~4ms poll when moving diagonally, so a
 * shared "last event" timestamp would see dt_ms collapse to ~0 for whichever
 * axis is processed second, inflating its computed speed. Matches the
 * approach used by github.com/oleksandrmaslov/zmk-pointing-acceleration. */
#define JUMP_ACCEL_MAX_DT_MS 100
#define JUMP_ACCEL_AXIS_STALE_MS 12
#define JUMP_ACCEL_HISTORY_SIZE 32

struct jump_accel_sample {
    int64_t timestamp_ms;
    int16_t dx;
    int16_t dy;
};

struct jump_accel_data {
    int32_t last_dx;
    int32_t last_dy;
    int64_t last_ts_x_ms;
    int64_t last_ts_y_ms;
    int64_t last_motion_ts_ms;
    int32_t filtered_speed_cps;
    int32_t filtered_factor_x1000;
    struct jump_accel_sample history[JUMP_ACCEL_HISTORY_SIZE];
    uint8_t history_head;
    uint8_t history_count;
};

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

/* Estimate speed from travelled distance over recent samples. Absolute axis
 * travel avoids gain collapsing on small reversals during ordinary control. */
static int32_t history_speed_cps(struct jump_accel_data *data, const struct input_event *event,
                                int64_t now, int32_t window_ms) {
    if (data->last_motion_ts_ms > 0 && now - data->last_motion_ts_ms > window_ms) {
        data->history_head = 0;
        data->history_count = 0;
        data->filtered_speed_cps = 0;
    }
    data->last_motion_ts_ms = now;

    struct jump_accel_sample *sample = &data->history[data->history_head];
    sample->timestamp_ms = now;
    sample->dx = event->code == INPUT_REL_X ? event->value : 0;
    sample->dy = event->code == INPUT_REL_Y ? event->value : 0;
    data->history_head = (data->history_head + 1) % JUMP_ACCEL_HISTORY_SIZE;
    if (data->history_count < JUMP_ACCEL_HISTORY_SIZE) {
        data->history_count++;
    }

    int64_t cutoff = now - window_ms;
    int64_t first_timestamp_ms = now;
    int32_t path_x = 0;
    int32_t path_y = 0;
    for (uint8_t i = 0; i < data->history_count; i++) {
        uint8_t index = (data->history_head + JUMP_ACCEL_HISTORY_SIZE - data->history_count + i) %
                        JUMP_ACCEL_HISTORY_SIZE;
        const struct jump_accel_sample *item = &data->history[index];
        if (item->timestamp_ms < cutoff) {
            continue;
        }
        if (item->timestamp_ms < first_timestamp_ms) {
            first_timestamp_ms = item->timestamp_ms;
        }
        /* Track distance travelled per axis, not net displacement. Small
         * reversals during normal ball control must not collapse estimated
         * speed and make pointer gain pump up and down. */
        path_x += item->dx < 0 ? -item->dx : item->dx;
        path_y += item->dy < 0 ? -item->dy : item->dy;
    }

    int64_t elapsed_ms = now - first_timestamp_ms;
    if (elapsed_ms < window_ms / 2) {
        return 0;
    }

    uint64_t magnitude_squared = (uint64_t)((int64_t)path_x * path_x) +
                                 (uint64_t)((int64_t)path_y * path_y);
    uint32_t magnitude = isqrt32(magnitude_squared > UINT32_MAX ? UINT32_MAX : magnitude_squared);
    return (int32_t)(((int64_t)magnitude * 1000) / elapsed_ms);
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

/* Normalized exponential ease-in: (2^(8t) - 1) / 255, fixed-point x1000.
 * A 1/16-step LUT avoids floating point and keeps firmware cost small. */
static int32_t exponential_x1000(int32_t t_x1000) {
    static const int16_t values[17] = {
        0, 2, 4, 7, 12, 18, 27, 40, 59, 85, 122, 174, 247, 351, 498, 706, 1000,
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

/* Precision-first hockey-stick response: 32 interpolated cubic stages. Gain
 * stays close to the slow-speed baseline through the middle, then rises steeply
 * near full-speed. Interpolation avoids hard jumps; no floating point needed. */
static int32_t hockey_stick_x1000(int32_t t_x1000) {
    static const int16_t stages[33] = {
        0, 0, 0, 0, 1, 3, 6, 10, 15, 22, 30,
        40, 52, 66, 83, 102, 125, 149, 177, 208, 244, 282,
        324, 370, 421, 476, 535, 599, 669, 743, 822, 907, 1000,
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

    const struct jump_accel_config *cfg = dev->config;
    struct jump_accel_data *data = dev->data;

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

    if (cfg->velocity_window_ms > 0) {
        speed_cps = history_speed_cps(data, event, now, cfg->velocity_window_ms);
    }

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
    if (state && state->remainder) {
        *state->remainder = (int16_t)(value_scaled - out * 1000);
    }

    event->value = (int16_t)out;

    return ZMK_INPUT_PROC_CONTINUE;
}

static struct zmk_input_processor_driver_api jump_accel_driver_api = {
    .handle_event = jump_accel_handle_event,
};

#define JUMP_ACCEL_INST(n)                                                                         \
    static struct jump_accel_data jump_accel_data_##n = {};                                        \
    static const struct jump_accel_config jump_accel_config_##n = {                                \
        .base_factor = DT_INST_PROP(n, base_factor),                                               \
        .fast_factor = DT_INST_PROP(n, fast_factor),                                                \
        .jump_start_cps = DT_INST_PROP(n, jump_start_cps),                                          \
        .jump_width_cps = DT_INST_PROP(n, jump_width_cps),                                          \
        .curve_type = DT_INST_ENUM_IDX(n, curve_type),                                               \
        .speed_smoothing_ms = DT_INST_PROP(n, speed_smoothing_ms),                                  \
        .velocity_window_ms = DT_INST_PROP(n, velocity_window_ms),                                  \
        .gain_smoothing_ms = DT_INST_PROP(n, gain_smoothing_ms),                                    \
    };                                                                                              \
    DEVICE_DT_INST_DEFINE(n, NULL, NULL, &jump_accel_data_##n, &jump_accel_config_##n, POST_KERNEL, \
                          CONFIG_KERNEL_INIT_PRIORITY_DEFAULT, &jump_accel_driver_api);

DT_INST_FOREACH_STATUS_OKAY(JUMP_ACCEL_INST)
