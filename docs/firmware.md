# Firmware And Recovery

## Split Roles

- Right half: main/central side, USB/ZMK Studio side, host Bluetooth side.
- Left half: peripheral side, pairs to the right half for normal split operation.

If the halves stop talking after a full reset or firmware flash, treat it as a settings/bonding problem first, not a layout problem.

## Included UF2 Files

| File | Purpose |
|---|---|
| `firmware/charybdis_right_trackball.uf2` | Current right/main firmware with trackball tuning |
| `firmware/charybdis_left.uf2` | Current left/peripheral firmware |
| `firmware/settings_reset.uf2` | Clears ZMK settings/bonds |
| `firmware/charybdis_right_trackball_ROLLBACK_CPI400_SNIPE200.uf2` | Right-side rollback firmware |
| `firmware/SHA256SUMS.txt` | Firmware hashes |

## Known Working Firmware Hashes

The current hashes are stored in `firmware/SHA256SUMS.txt`.

Use the hash file when moving UF2s between machines or before publishing a release.

## Trackball Tuning

The current PMW3610 intent is:

```conf
CONFIG_PMW3610_CPI=600
CONFIG_PMW3610_SNIPE_CPI=1600
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_SMART_ALGORITHM=y
```

Layer 8 is used for high-speed pointer travel through `snipe-layers = <8>`.

Layer 1 is used for trackball scroll through `scroll-layers = <1>`.

## Bluetooth Coach Beacons

The modern coach is Bluetooth-first. It does not use USB serial, WebUSB, or debug transport to know layer state.

Host-visible layer state comes from BLE HID beacon chords emitted by ZMK macros and swallowed by AutoHotkey. The reference macro include is:

```text
firmware/coach_beacon_macros.keymap.dtsi
```

Wire those macros into the active firmware source only after confirming that source matches the final v1.8 Studio layout. The vendored keymap in this repo may not represent the live Studio-applied layout, so do not blindly replace the verified layout from it.

## Vendor Source

The compact vendor source kept in this repo is:

- `vendor/vzhao-zmk-for-charybdis-main-20250226/config/`
- `vendor/vzhao-zmk-for-charybdis-main-20250226/zmk-pmw3610-driver/`
- `vendor/vzhao-zmk-for-charybdis-main-20250226/build.yaml`

The large generated folders are intentionally ignored:

- `.west/`
- `build/`
- `modules/`
- `zephyr/`
- `zmk/`
- vendor-local `firmware/`

## Build Firmware

Right/main side:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\powershell\build_right_firmware_docker.ps1
```

Left/peripheral side:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\powershell\build_left_firmware_docker.ps1
```

The build scripts:

- use Docker
- regenerate the local Zephyr/ZMK dependency tree under `vendor/`
- copy the resulting UF2 into top-level `firmware/`
- refresh `firmware/SHA256SUMS.txt`
- do not flash automatically

## Recovery Notes

Use `settings_reset.uf2` when stale ZMK settings or Bluetooth bonds are likely.

After settings reset:

1. Reflash the correct side firmware if needed.
2. Remove old Charybdis Bluetooth entries from the host.
3. Pair the right/main side to the host again.
4. Confirm the left/peripheral side talks to the right/main side.
5. Verify the live Studio layout.

Do not treat a failed left-side wireless connection as a layer/keybinding issue until firmware and settings state are known good.
