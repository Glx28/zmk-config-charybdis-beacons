/*
 * Copyright (c) 2026 The Charybdis Contributors
 *
 * SPDX-License-Identifier: MIT
 */

#define DT_DRV_COMPAT zmk_input_processor_motion_smoother

#include <zephyr/kernel.h>
#include <zephyr/device.h>
#include <zephyr/dt-bindings/input/input-event-codes.h>
#include <drivers/input_processor.h>

struct motion_smoother_config {
    int32_t time_constant_ms;
    int32_t scale_x1000;
};

struct motion_smoother_axis {
    int64_t last_ts_ms;
    int32_t filtered_q8;
};

struct motion_smoother_data {
    struct motion_smoother_axis x;
    struct motion_smoother_axis y;
};

#define MOTION_SMOOTHER_MAX_DT_MS 32
#define MOTION_SMOOTHER_RESET_GAP_MS 24

static int motion_smoother_handle_event(const struct device *dev, struct input_event *event,
                                        uint32_t param1, uint32_t param2,
                                        struct zmk_input_processor_state *state) {
    if (event->type != INPUT_EV_REL ||
        (event->code != INPUT_REL_X && event->code != INPUT_REL_Y)) {
        return ZMK_INPUT_PROC_CONTINUE;
    }

    const struct motion_smoother_config *cfg = dev->config;
    struct motion_smoother_data *data = dev->data;
    struct motion_smoother_axis *axis = event->code == INPUT_REL_X ? &data->x : &data->y;
    const int64_t now = k_uptime_get();
    int32_t filtered;

    if (axis->last_ts_ms == 0 || now - axis->last_ts_ms > MOTION_SMOOTHER_RESET_GAP_MS) {
        /* Do not carry old movement across a pause; first sample stays immediate. */
        filtered = (int32_t)event->value * 256;
    } else {
        int64_t dt = now - axis->last_ts_ms;
        if (dt < 1) {
            dt = 1;
        } else if (dt > MOTION_SMOOTHER_MAX_DT_MS) {
            dt = MOTION_SMOOTHER_MAX_DT_MS;
        }

        /* Same time-based low-pass on both axes. No speed-dependent gain. */
        const int32_t alpha_x1000 =
            (int32_t)((dt * 1000) / (cfg->time_constant_ms + dt));
        const int32_t input_q8 = (int32_t)event->value * 256;
        axis->filtered_q8 +=
            (int32_t)(((int64_t)(input_q8 - axis->filtered_q8) * alpha_x1000) / 1000);
        filtered = axis->filtered_q8;
    }
    axis->last_ts_ms = now;

    int32_t scaled_q8 = (int32_t)(((int64_t)filtered * cfg->scale_x1000) / 1000);
    if (state && state->remainder) {
        scaled_q8 += *state->remainder;
    }

    int32_t output = scaled_q8 / 256;
    if (output > INT16_MAX) {
        output = INT16_MAX;
        if (state && state->remainder) {
            *state->remainder = 0;
        }
    } else if (output < INT16_MIN) {
        output = INT16_MIN;
        if (state && state->remainder) {
            *state->remainder = 0;
        }
    } else if (state && state->remainder) {
        *state->remainder = (int16_t)(scaled_q8 - output * 256);
    }

    event->value = (int16_t)output;
    return ZMK_INPUT_PROC_CONTINUE;
}

static struct zmk_input_processor_driver_api motion_smoother_driver_api = {
    .handle_event = motion_smoother_handle_event,
};

#define MOTION_SMOOTHER_INST(n)                                                                    \
    static struct motion_smoother_data motion_smoother_data_##n = {};                              \
    static const struct motion_smoother_config motion_smoother_config_##n = {                      \
        .time_constant_ms = DT_INST_PROP(n, time_constant_ms),                                     \
        .scale_x1000 = DT_INST_PROP(n, scale_x1000),                                                \
    };                                                                                              \
    DEVICE_DT_INST_DEFINE(n, NULL, NULL, &motion_smoother_data_##n,                                \
                          &motion_smoother_config_##n, POST_KERNEL,                                \
                          CONFIG_KERNEL_INIT_PRIORITY_DEFAULT, &motion_smoother_driver_api);

DT_INST_FOREACH_STATUS_OKAY(MOTION_SMOOTHER_INST)
