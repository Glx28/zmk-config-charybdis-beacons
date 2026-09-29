/* Copyright (c) 2026 Glx28. SPDX-License-Identifier: MIT */

#define DT_DRV_COMPAT zmk_behavior_coach_scroll

#include <errno.h>
#include <string.h>

#include <zephyr/device.h>
#include <zephyr/logging/log.h>
#include <zephyr/sys/util.h>

#include <drivers/behavior.h>
#include <zmk/behavior.h>
#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
#include <zmk/keymap.h>
#include <zmk/matrix.h>
#endif

LOG_MODULE_DECLARE(zmk, CONFIG_ZMK_LOG_LEVEL);

#define COACH_SCROLL_LAYER 11

#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
struct coach_scroll_hold_state {
    bool active;
    bool activated_target;
    bool activated_scroll;
    uint8_t target_layer;
};

static struct coach_scroll_hold_state hold_states[ZMK_KEYMAP_LEN];
#endif

static int coach_scroll_init(const struct device *dev) { return 0; }

static int on_keymap_binding_pressed(struct zmk_behavior_binding *binding,
                                     struct zmk_behavior_binding_event event) {
#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
    if (event.position >= ARRAY_SIZE(hold_states)) {
        return -EINVAL;
    }

    struct coach_scroll_hold_state *state = &hold_states[event.position];
    if (state->active) {
        return 0;
    }

    memset(state, 0, sizeof(*state));
    state->target_layer = (uint8_t)binding->param1;

    if (state->target_layer >= COACH_SCROLL_LAYER) {
        return -EINVAL;
    }

    if (!zmk_keymap_layer_active(state->target_layer)) {
        int err = zmk_keymap_layer_activate(state->target_layer);
        if (err) {
            return err;
        }
        state->activated_target = true;
    }

    if (!zmk_keymap_layer_active(COACH_SCROLL_LAYER)) {
        int err = zmk_keymap_layer_activate(COACH_SCROLL_LAYER);
        if (err) {
            if (state->activated_target) {
                zmk_keymap_layer_deactivate(state->target_layer);
            }
            memset(state, 0, sizeof(*state));
            return err;
        }
        state->activated_scroll = true;
    }

    state->active = true;
    return 0;
#else
    ARG_UNUSED(binding);
    ARG_UNUSED(event);
    return 0;
#endif
}

static int on_keymap_binding_released(struct zmk_behavior_binding *binding,
                                      struct zmk_behavior_binding_event event) {
#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)
    if (event.position >= ARRAY_SIZE(hold_states)) {
        return -EINVAL;
    }

    struct coach_scroll_hold_state state = hold_states[event.position];
    memset(&hold_states[event.position], 0, sizeof(hold_states[event.position]));
    if (!state.active) {
        return 0;
    }

    int err = 0;
    if (state.activated_scroll) {
        err = zmk_keymap_layer_deactivate(COACH_SCROLL_LAYER);
    }
    if (state.activated_target) {
        int target_err = zmk_keymap_layer_deactivate(state.target_layer);
        if (!err) {
            err = target_err;
        }
    }
    return err;
#else
    ARG_UNUSED(binding);
    ARG_UNUSED(event);
    return 0;
#endif
}

static const struct behavior_driver_api behavior_coach_scroll_driver_api = {
    .locality = BEHAVIOR_LOCALITY_CENTRAL,
    .binding_pressed = on_keymap_binding_pressed,
    .binding_released = on_keymap_binding_released,
};

BEHAVIOR_DT_INST_DEFINE(0, &coach_scroll_init, NULL, NULL, NULL, POST_KERNEL,
                        CONFIG_KERNEL_INIT_PRIORITY_DEFAULT,
                        &behavior_coach_scroll_driver_api);
