/* Copyright (c) 2026 Glx28. SPDX-License-Identifier: MIT */

#define DT_DRV_COMPAT zmk_behavior_coach_beacon

#include <zephyr/device.h>
#include <zephyr/logging/log.h>

#include <drivers/behavior.h>
#include <zmk/behavior.h>

#include "coach_beacon.h"

LOG_MODULE_DECLARE(zmk, CONFIG_ZMK_LOG_LEVEL);

static int behavior_coach_beacon_init(const struct device *dev) { return 0; }

static int on_keymap_binding_pressed(struct zmk_behavior_binding *binding,
                                     struct zmk_behavior_binding_event event) {
    return zmk_coach_beacon_notify((uint8_t)binding->param1,
                                   (uint8_t)binding->param2, 1);
}

static int on_keymap_binding_released(struct zmk_behavior_binding *binding,
                                      struct zmk_behavior_binding_event event) {
    if (binding->param2 != 0) {
        return 0;
    }
    return zmk_coach_beacon_notify((uint8_t)binding->param1, 0, 0);
}

static const struct behavior_driver_api behavior_coach_beacon_driver_api = {
    .locality = BEHAVIOR_LOCALITY_CENTRAL,
    .binding_pressed = on_keymap_binding_pressed,
    .binding_released = on_keymap_binding_released,
};

#define COACH_BEACON_INST(n)                                                                       \
    BEHAVIOR_DT_INST_DEFINE(n, &behavior_coach_beacon_init, NULL, NULL, NULL, POST_KERNEL,         \
                            CONFIG_KERNEL_INIT_PRIORITY_DEFAULT,                                  \
                            &behavior_coach_beacon_driver_api);

DT_INST_FOREACH_STATUS_OKAY(COACH_BEACON_INST)
