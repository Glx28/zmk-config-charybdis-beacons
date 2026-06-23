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

The current PMW3610 config:

```conf
CONFIG_PMW3610_CPI=600            # 600 / DIVIDOR 4 = 150 effective (precision)
CONFIG_PMW3610_CPI_DIVIDOR=4      # sensor floor is CPI 200; use DIVIDOR (1-100) for lower effective
CONFIG_PMW3610_SNIPE_CPI=1000     # Speed mode (Layer 8)
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_SMART_ALGORITHM=y
```

Also in `config/charybdis.keymap`: `&zip_xy_scaler 1 1` (was `2 1`). The 2x axis
doubling distorted diagonals/curves (the "can't make clean paths" complaint); 1:1 is the
real precision fix. Travel speed comes from the Layer 8 snipe mode, not this scaler.

Layer 8 is used for high-speed pointer travel through `snipe-layers = <8>`.

Layer 6 is used for trackball scroll through `scroll-layers = <6>`.

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

Firmware is built via GitHub Actions on the `zmk-config-charybdis-beacons` repo.

1. Push config changes to `zmk-config-charybdis-beacons` on GitHub
2. GitHub Actions runs the build (triggered on push or manual workflow_dispatch)
3. Download the UF2 artifacts from the Actions run
4. Flash by putting the half in bootloader mode and copying the UF2 to the mounted drive

The build workflow is at `.github/workflows/build.yml` and uses the `build.yaml` matrix.

## Recovery Notes

Use `settings_reset.uf2` when stale ZMK settings or Bluetooth bonds are likely.

After settings reset:

1. Reflash the correct side firmware if needed.
2. Remove old Charybdis Bluetooth entries from the host.
3. Pair the right/main side to the host again.
4. Confirm the left/peripheral side talks to the right/main side.
5. Verify the live Studio layout.

Do not treat a failed left-side wireless connection as a layer/keybinding issue until firmware and settings state are known good.
