/* Copyright (c) 2026 The Charybdis Contributors
 * SPDX-License-Identifier: MIT
 */

#pragma once

#include <stdint.h>
#include <zephyr/device.h>

int jump_accel_tune(const struct device *dev, uint8_t action);
