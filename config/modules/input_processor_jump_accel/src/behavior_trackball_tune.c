/* Copyright (c) 2026 The Charybdis Contributors
 * SPDX-License-Identifier: MIT
 */

#define DT_DRV_COMPAT zmk_behavior_trackball_tune

#include <zephyr/device.h>
#include <zephyr/logging/log.h>

#include <drivers/behavior.h>
#include <zmk/behavior.h>

#include "jump_accel_tune.h"

LOG_MODULE_DECLARE(zmk, CONFIG_ZMK_LOG_LEVEL);

struct trackball_tune_config {
    const struct device *processor;
};

static int trackball_tune_init(const struct device *dev) { return 0; }

static int on_keymap_binding_pressed(struct zmk_behavior_binding *binding,
                                    struct zmk_behavior_binding_event event) {
    const struct device *dev = zmk_behavior_get_binding(binding->behavior_dev);
    const struct trackball_tune_config *config = dev->config;
    return jump_accel_tune(config->processor, (uint8_t)binding->param1);
}

static int on_keymap_binding_released(struct zmk_behavior_binding *binding,
                                      struct zmk_behavior_binding_event event) {
    return 0;
}

static const struct behavior_driver_api trackball_tune_api = {
    .locality = BEHAVIOR_LOCALITY_EVENT_SOURCE,
    .binding_pressed = on_keymap_binding_pressed,
    .binding_released = on_keymap_binding_released,
};

#define TRACKBALL_TUNE_INST(n)                                                                     \
    static const struct trackball_tune_config trackball_tune_config_##n = {                        \
        .processor = DEVICE_DT_GET(DT_INST_PHANDLE(n, processor)),                                 \
    };                                                                                             \
    BEHAVIOR_DT_INST_DEFINE(n, &trackball_tune_init, NULL, NULL,                                   \
                            &trackball_tune_config_##n, POST_KERNEL,                              \
                            CONFIG_KERNEL_INIT_PRIORITY_DEFAULT, &trackball_tune_api);

DT_INST_FOREACH_STATUS_OKAY(TRACKBALL_TUNE_INST)
