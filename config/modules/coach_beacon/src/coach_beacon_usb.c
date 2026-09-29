/* Copyright (c) 2026 Glx28. SPDX-License-Identifier: MIT */

#include <errno.h>

#include <zephyr/device.h>
#include <zephyr/init.h>
#include <zephyr/kernel.h>
#include <zephyr/logging/log.h>
#include <zephyr/usb/class/usb_hid.h>
#include <zephyr/usb/usb_device.h>

#include <zmk/usb.h>

#include "coach_beacon.h"

LOG_MODULE_DECLARE(coach_beacon, CONFIG_ZMK_LOG_LEVEL);

#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL) && IS_ENABLED(CONFIG_ZMK_USB)

/* Separate vendor-defined HID collection. It is not part of the keyboard
 * collection, so these reports never become key input on the host. */
static const uint8_t coach_report_descriptor[] = {
    0x06, 0x00, 0xFF, /* Usage Page (Vendor 0xFF00) */
    0x09, 0x01,       /* Usage (1) */
    0xA1, 0x01,       /* Collection (Application) */
    0x85, 0x01,       /* Report ID (1) */
    0x15, 0x00,       /* Logical Minimum (0) */
    0x26, 0xFF, 0x00, /* Logical Maximum (255) */
    0x75, 0x08,       /* Report Size (8 bits) */
    0x95, 0x05,       /* Report Count (5 bytes) */
    0x19, 0x01,       /* Usage Minimum (1) */
    0x29, 0x05,       /* Usage Maximum (5) */
    0x81, 0x02,       /* Input (Data, Variable, Absolute) */
    0xC0,             /* End Collection */
};

static const struct device *coach_hid_dev;
static K_SEM_DEFINE(coach_hid_sem, 1, 1);

static void coach_hid_in_ready(const struct device *dev) { k_sem_give(&coach_hid_sem); }

static const struct hid_ops coach_hid_ops = {
    .int_in_ready = coach_hid_in_ready,
};

int zmk_coach_beacon_usb_notify(uint8_t layer, uint8_t kind, uint8_t pressed) {
    if (!coach_hid_dev || !zmk_usb_is_hid_ready()) {
        return -ENODEV;
    }

    const uint8_t report[] = {1, 0x43, 1, layer, kind, pressed};
    k_sem_take(&coach_hid_sem, K_MSEC(30));
    int err = hid_int_ep_write(coach_hid_dev, report, sizeof(report), NULL);
    if (err) {
        k_sem_give(&coach_hid_sem);
        LOG_WRN("Coach USB beacon send failed: %d", err);
    }
    return err;
}

static int coach_hid_init(void) {
    coach_hid_dev = device_get_binding("HID_1");
    if (!coach_hid_dev) {
        LOG_ERR("Coach USB HID interface HID_1 is unavailable");
        return -ENODEV;
    }

    usb_hid_register_device(coach_hid_dev, coach_report_descriptor,
                            sizeof(coach_report_descriptor), &coach_hid_ops);
    return usb_hid_init(coach_hid_dev);
}

SYS_INIT(coach_hid_init, APPLICATION, CONFIG_APPLICATION_INIT_PRIORITY);

#else

int zmk_coach_beacon_usb_notify(uint8_t layer, uint8_t kind, uint8_t pressed) {
    ARG_UNUSED(layer);
    ARG_UNUSED(kind);
    ARG_UNUSED(pressed);
    return -ENOTSUP;
}

#endif
