/* Copyright (c) 2026 Glx28. SPDX-License-Identifier: MIT */

#include <errno.h>

#include <zephyr/bluetooth/bluetooth.h>
#include <zephyr/bluetooth/gatt.h>
#include <zephyr/logging/log.h>
#include <zephyr/sys/util.h>

#include <zmk/endpoints.h>
#include <zmk/usb.h>

#include "coach_beacon.h"

LOG_MODULE_REGISTER(coach_beacon, CONFIG_ZMK_LOG_LEVEL);

#if IS_ENABLED(CONFIG_ZMK_SPLIT_ROLE_CENTRAL)

#define COACH_BEACON_SERVICE_UUID \
    BT_UUID_128_ENCODE(0x3f9e4e20, 0x50c4, 0x4b43, 0xa789, 0x8a982318e9a0)
#define COACH_BEACON_CHAR_UUID \
    BT_UUID_128_ENCODE(0x3f9e4e21, 0x50c4, 0x4b43, 0xa789, 0x8a982318e9a0)

static void coach_beacon_ccc_changed(const struct bt_gatt_attr *attr, uint16_t value) {
    ARG_UNUSED(attr);
    ARG_UNUSED(value);
}

BT_GATT_SERVICE_DEFINE(coach_beacon_service,
    BT_GATT_PRIMARY_SERVICE(BT_UUID_DECLARE_128(COACH_BEACON_SERVICE_UUID)),
    BT_GATT_CHARACTERISTIC(BT_UUID_DECLARE_128(COACH_BEACON_CHAR_UUID),
                           BT_GATT_CHRC_NOTIFY, BT_GATT_PERM_NONE,
                           NULL, NULL, NULL),
    BT_GATT_CCC(coach_beacon_ccc_changed, BT_GATT_PERM_READ | BT_GATT_PERM_WRITE));

int zmk_coach_beacon_notify(uint8_t layer, uint8_t kind, uint8_t pressed) {
    struct zmk_endpoint_instance endpoint = zmk_endpoints_selected();
    if (endpoint.transport == ZMK_TRANSPORT_USB) {
        return zmk_coach_beacon_usb_notify(layer, kind, pressed);
    }
    const uint8_t message[] = {0x43, 1, layer, kind, pressed};
    int err = bt_gatt_notify(NULL, &coach_beacon_service.attrs[2], message, sizeof(message));
    if (err && err != -ENOTCONN) {
        LOG_WRN("Coach beacon notify failed: %d", err);
    }
    return err;
}

#else

int zmk_coach_beacon_notify(uint8_t layer, uint8_t kind, uint8_t pressed) {
    ARG_UNUSED(layer);
    ARG_UNUSED(kind);
    ARG_UNUSED(pressed);
    return 0;
}

#endif
