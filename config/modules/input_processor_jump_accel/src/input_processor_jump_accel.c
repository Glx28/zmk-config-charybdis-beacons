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
};

/* Per-axis timestamps (not one shared clock) -- PMW3610 reports X then Y as
 * two separate events within the same ~4ms poll when moving diagonally, so a
 * shared "last event" timestamp would see dt_ms collapse to ~0 for whichever
 * axis is processed second, inflating its computed speed. Matches the
 * approach used by github.com/oleksandrmaslov/zmk-pointing-acceleration. */
#define JUMP_ACCEL_MAX_DT_MS 100

struct jump_accel_data {
    int32_t last_dx;
    int32_t last_dy;
    int64_t last_ts_x_ms;
    int64_t last_ts_y_ms;
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
    int64_t *last_ts_ms = (event->code == INPUT_REL_X) ? &data->last_ts_x_ms : &data->last_ts_y_ms;
    int64_t dt_ms = (*last_ts_ms > 0) ? (now - *last_ts_ms) : 1;
    if (dt_ms <= 0) {
        dt_ms = 1;
    } else if (dt_ms > JUMP_ACCEL_MAX_DT_MS) {
        dt_ms = JUMP_ACCEL_MAX_DT_MS;
    }
    *last_ts_ms = now;

    /* Whole-vector speed: combine this event's axis with the other axis'
     * most recently seen raw value, rather than treating axes independently.
     * At native poll rates this lags the true synchronized magnitude by at
     * most one axis-event, which is negligible relative to jump-width-cps. */
    if (event->code == INPUT_REL_X) {
        data->last_dx = event->value;
    } else {
        data->last_dy = event->value;
    }

    uint32_t mag_sq = (uint32_t)(data->last_dx * data->last_dx) +
                      (uint32_t)(data->last_dy * data->last_dy);
    uint32_t mag = isqrt32(mag_sq);
    int32_t speed_cps = (int32_t)(((int64_t)mag * 1000) / dt_ms);

    int32_t t_x1000;
    if (cfg->jump_width_cps > 0) {
        t_x1000 = (int32_t)(((int64_t)(speed_cps - cfg->jump_start_cps) * 1000) /
                           cfg->jump_width_cps);
    } else {
        t_x1000 = speed_cps >= cfg->jump_start_cps ? 1000 : 0;
    }

    int32_t eased_x1000 = smootherstep_x1000(t_x1000);
    int32_t factor_x1000 =
        cfg->base_factor +
        (int32_t)(((int64_t)(cfg->fast_factor - cfg->base_factor) * eased_x1000) / 1000);

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
    };                                                                                              \
    DEVICE_DT_INST_DEFINE(n, NULL, NULL, &jump_accel_data_##n, &jump_accel_config_##n, POST_KERNEL, \
                          CONFIG_KERNEL_INIT_PRIORITY_DEFAULT, &jump_accel_driver_api);

DT_INST_FOREACH_STATUS_OKAY(JUMP_ACCEL_INST)
