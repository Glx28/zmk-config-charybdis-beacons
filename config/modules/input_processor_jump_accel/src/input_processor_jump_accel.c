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

struct jump_accel_data {
    int32_t last_dx;
    int32_t last_dy;
    int64_t last_ts_ms;
};

static int jump_accel_handle_event(const struct device *dev, struct input_event *event,
                                   uint32_t param1, uint32_t param2,
                                   struct zmk_input_processor_state *state) {
    // Skeleton: passthrough only, curve logic lands in a follow-up commit
    // once this wiring is confirmed to compile via CI.
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
