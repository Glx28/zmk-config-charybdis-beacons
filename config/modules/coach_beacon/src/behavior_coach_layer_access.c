/* Copyright (c) 2026 Glx28. SPDX-License-Identifier: MIT */

#define DT_DRV_COMPAT zmk_behavior_coach_layer_access

#include <errno.h>
#include <stdbool.h>
#include <stdint.h>

#include <zephyr/device.h>
#include <zephyr/logging/log.h>
#include <zephyr/sys/util.h>

#include <drivers/behavior.h>
#include <zmk/behavior.h>
#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
#include <zmk/keymap.h>
#endif

LOG_MODULE_DECLARE(zmk, CONFIG_ZMK_LOG_LEVEL);

enum coach_layer_access_mode {
    COACH_LAYER_HOLD = 0,
    COACH_LAYER_TOGGLE = 1,
    COACH_LAYER_RESET = 2,
};

#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
static uint8_t hold_counts[ZMK_KEYMAP_LAYERS_LEN];
static bool layer_locked[ZMK_KEYMAP_LAYERS_LEN];

static int apply_layer_state(uint8_t layer) {
    if (layer >= ZMK_KEYMAP_LAYERS_LEN) {
        return -EINVAL;
    }

    if (layer_locked[layer] || hold_counts[layer] > 0) {
        return zmk_keymap_layer_activate(layer);
    }

    return zmk_keymap_layer_deactivate(layer);
}
#endif

static int on_keymap_binding_pressed(struct zmk_behavior_binding *binding,
                                     struct zmk_behavior_binding_event event) {
#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
    ARG_UNUSED(event);
    uint8_t layer = (uint8_t)binding->param1;
    uint8_t mode = (uint8_t)binding->param2;

    if (mode == COACH_LAYER_RESET) {
        for (uint8_t i = 0; i < ZMK_KEYMAP_LAYERS_LEN; i++) {
            layer_locked[i] = false;
        }
        return 0;
    }

    if (layer >= ZMK_KEYMAP_LAYERS_LEN) {
        return -EINVAL;
    }

    switch (mode) {
    case COACH_LAYER_HOLD:
        if (hold_counts[layer] == UINT8_MAX) {
            return -EOVERFLOW;
        }
        hold_counts[layer]++;
        return zmk_keymap_layer_activate(layer);
    case COACH_LAYER_TOGGLE:
        layer_locked[layer] = !layer_locked[layer];
        return apply_layer_state(layer);
    default:
        return -ENOTSUP;
    }
#else
    ARG_UNUSED(binding);
    ARG_UNUSED(event);
    return 0;
#endif
}

static int on_keymap_binding_released(struct zmk_behavior_binding *binding,
                                      struct zmk_behavior_binding_event event) {
#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
    ARG_UNUSED(event);
    uint8_t layer = (uint8_t)binding->param1;
    uint8_t mode = (uint8_t)binding->param2;

    if (mode != COACH_LAYER_HOLD) {
        return ZMK_BEHAVIOR_OPAQUE;
    }
    if (layer >= ZMK_KEYMAP_LAYERS_LEN) {
        return -EINVAL;
    }
    if (hold_counts[layer] == 0) {
        return 0;
    }

    hold_counts[layer]--;
    return apply_layer_state(layer);
#else
    ARG_UNUSED(binding);
    ARG_UNUSED(event);
    return 0;
#endif
}

static const struct behavior_driver_api behavior_coach_layer_access_driver_api = {
    .locality = BEHAVIOR_LOCALITY_CENTRAL,
    .binding_pressed = on_keymap_binding_pressed,
    .binding_released = on_keymap_binding_released,
};

BEHAVIOR_DT_INST_DEFINE(0, NULL, NULL, NULL, NULL, POST_KERNEL,
                        CONFIG_KERNEL_INIT_PRIORITY_DEFAULT,
                        &behavior_coach_layer_access_driver_api);
