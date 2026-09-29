#pragma once

#include <stdint.h>

/* kind: 0 hold, 1 toggle, 2 lock, 3 exit-to-base; pressed: 0 or 1. */
int zmk_coach_beacon_notify(uint8_t layer, uint8_t kind, uint8_t pressed);
int zmk_coach_beacon_usb_notify(uint8_t layer, uint8_t kind, uint8_t pressed);
