/* Copyright (c) 2026 Glx28. SPDX-License-Identifier: MIT */

#define DT_DRV_COMPAT zmk_behavior_coach_layer_access

#include <errno.h>
#include <stdbool.h>
#include <stddef.h>
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
static uint8_t suppressed_counts[ZMK_KEYMAP_LAYERS_LEN];

struct hold_frame {
    bool active;
    bool waiting_for_unlock;
    uint8_t target;
    uint32_t suppressed_mask;
    uint32_t order;
};

/* One frame per possible physical key prevents duplicate holds from sharing
 * parent state. Layer holds are released in arbitrary key-up order. */
static struct hold_frame hold_frames[ZMK_KEYMAP_LEN];
static uint32_t next_hold_order;

static int apply_layer_state(uint8_t layer) {
    if (layer >= ZMK_KEYMAP_LAYERS_LEN) {
        return -EINVAL;
    }

    if (suppressed_counts[layer] > 0) {
        return zmk_keymap_layer_deactivate(layer);
    }

    if (layer_locked[layer] || hold_counts[layer] > 0) {
        return zmk_keymap_layer_activate(layer);
    }

    return zmk_keymap_layer_deactivate(layer);
}

static struct hold_frame *find_free_hold_frame(void) {
    for (size_t i = 0; i < ARRAY_SIZE(hold_frames); i++) {
        if (!hold_frames[i].active) {
            return &hold_frames[i];
        }
    }
    return NULL;
}

static struct hold_frame *find_latest_hold_frame(uint8_t target) {
    struct hold_frame *latest = NULL;
    for (size_t i = 0; i < ARRAY_SIZE(hold_frames); i++) {
        struct hold_frame *frame = &hold_frames[i];
        if (frame->active && !frame->waiting_for_unlock && frame->target == target &&
            (latest == NULL || frame->order > latest->order)) {
            latest = frame;
        }
    }
    return latest;
}

static int restore_suppressed_parents(struct hold_frame *frame) {
    uint32_t mask = frame->suppressed_mask;
    frame->active = false;
    frame->waiting_for_unlock = false;
    frame->suppressed_mask = 0;

    int result = 0;
    for (uint8_t layer = 1; layer < ZMK_KEYMAP_LAYERS_LEN; layer++) {
        if ((mask & BIT(layer)) == 0) {
            continue;
        }
        if (suppressed_counts[layer] > 0) {
            suppressed_counts[layer]--;
        }
        int err = apply_layer_state(layer);
        if (err < 0 && result == 0) {
            result = err;
        }
    }
    return result;
}

static int finish_waiting_frames(uint8_t target) {
    if (target >= ZMK_KEYMAP_LAYERS_LEN || layer_locked[target] || hold_counts[target] > 0) {
        return 0;
    }

    int result = 0;
    for (size_t i = 0; i < ARRAY_SIZE(hold_frames); i++) {
        struct hold_frame *frame = &hold_frames[i];
        if (frame->active && frame->waiting_for_unlock && frame->target == target) {
            int err = restore_suppressed_parents(frame);
            if (err < 0 && result == 0) {
                result = err;
            }
        }
    }
    return result;
}

static int begin_layer_hold(uint8_t target) {
    if (hold_counts[target] == UINT8_MAX) {
        return -EOVERFLOW;
    }

    struct hold_frame *frame = find_free_hold_frame();
    if (frame == NULL) {
        return -ENOMEM;
    }

    frame->active = true;
    frame->waiting_for_unlock = false;
    frame->target = target;
    frame->suppressed_mask = 0;
    frame->order = ++next_hold_order;

    /* A later nested hold takes precedence over every still-held ancestor,
     * including ancestors with larger ZMK layer indexes. Restore ancestors
     * when this hold releases. */
    for (uint8_t parent = target + 1; parent < ZMK_KEYMAP_LAYERS_LEN; parent++) {
        if (hold_counts[parent] == 0) {
            continue;
        }
        if (suppressed_counts[parent] == UINT8_MAX) {
            frame->active = false;
            return -EOVERFLOW;
        }
        frame->suppressed_mask |= BIT(parent);
        suppressed_counts[parent]++;
        int err = apply_layer_state(parent);
        if (err < 0) {
            frame->active = false;
            for (uint8_t rollback = target + 1; rollback < ZMK_KEYMAP_LAYERS_LEN; rollback++) {
                if ((frame->suppressed_mask & BIT(rollback)) != 0) {
                    suppressed_counts[rollback]--;
                    apply_layer_state(rollback);
                }
            }
            frame->suppressed_mask = 0;
            return err;
        }
    }

    hold_counts[target]++;
    return apply_layer_state(target);
}

static int end_layer_hold(uint8_t target) {
    if (hold_counts[target] == 0) {
        return 0;
    }

    hold_counts[target]--;
    struct hold_frame *frame = find_latest_hold_frame(target);
    int result = apply_layer_state(target);
    if (frame == NULL) {
        return result;
    }

    if (layer_locked[target]) {
        frame->waiting_for_unlock = true;
        return result;
    }

    int restore_result = restore_suppressed_parents(frame);
    return result < 0 ? result : restore_result;
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
        int result = 0;
        for (uint8_t i = 1; i < ZMK_KEYMAP_LAYERS_LEN; i++) {
            int err = finish_waiting_frames(i);
            if (err < 0 && result == 0) {
                result = err;
            }
        }
        return result;
    }

    if (layer >= ZMK_KEYMAP_LAYERS_LEN) {
        return -EINVAL;
    }

    switch (mode) {
    case COACH_LAYER_HOLD:
        return begin_layer_hold(layer);
    case COACH_LAYER_TOGGLE:
        layer_locked[layer] = !layer_locked[layer];
        {
            int result = apply_layer_state(layer);
            int finish_result = finish_waiting_frames(layer);
            return result < 0 ? result : finish_result;
        }
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
    return end_layer_hold(layer);
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
