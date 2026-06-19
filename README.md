# ZMK Firmware for Charybdis Split Keyboard with Coach Beacons

This repository contains ZMK firmware configuration for the Charybdis split keyboard with custom coach beacon macros for real-time layer change visualization over Bluetooth.

## Features

- **PMW3610 Trackball Support**: Right half includes PixArt PMW3610 optical sensor
- **Dual CPI Modes**: 600 CPI default, 1600 CPI travel mode (Layer 8)
- **ZMK Studio Support**: Runtime configuration via USB
- **RGB Underglow**: WS2812 LED support on both halves
- **Coach Beacons**: HID macro chords (Ctrl+Alt+Shift+F13-F24) for layer state broadcasting

## Trackball Configuration

- **Default CPI**: 600 (calm precision for normal work)
- **Travel CPI**: 1600 (high-speed mode on Layer 8)
- **Scroll Layers**: Layer 1 (trackball becomes scroll wheel)
- **Orientation**: 90° rotation, X-axis inverted
- **Polling Rate**: 125 Hz

## Building Firmware

Firmware is automatically built by GitHub Actions on every push. Download the latest build from the [Actions tab](../../actions).

Three firmware files are produced:
- `nice_nano_v2-charybdis_left.uf2` - Left half
- `nice_nano_v2-charybdis_right.uf2` - Right half with trackball
- `nice_nano_v2-settings_reset.uf2` - Settings reset utility

## Flashing Instructions

1. **Flash settings_reset.uf2 to BOTH halves** (clears Bluetooth bonds)
2. Flash `charybdis_left.uf2` to left half
3. Flash `charybdis_right.uf2` to right half
4. Pair both halves to your computer via Bluetooth

## Beacon Macros

The firmware includes custom beacon macros that emit HID chords to signal layer changes:
- Layer 1 hold/release: F13/F14
- Layer 3 hold/release: F15/F16
- Layer 4 hold/release: F17/F18
- Mouse lock/unlock: F19/F20
- Game lock/unlock: F21/F22
- Base layer: F23
- Travel toggle: F24

These beacons are captured by AutoHotkey and displayed in the coach web UI.

## Hardware

- Controller: Nice Nano v2 (nRF52840)
- Sensor: PixArt PMW3610 (200-3200 CPI)
- RGB: WS2812 LEDs (27 right, 29 left)
- Connectivity: Bluetooth Low Energy

---

Generated with beacon macro support for real-time layer visualization.
