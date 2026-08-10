# Charybdis ZMK Config — Firmware & Layout

Split keyboard (Charybdis V&Z), 2x Nice!Nano v2 (nRF52840), PMW3610 thumb trackball on right half, wireless BLE + USB-C. 5 BT profiles.

## Build & Flash

- **GitHub Actions ONLY** — no Docker, no local builds
- Push to `main` → CI builds → `gh run download <id> -n "firmware-nice_nano_v2-charybdis_right-studio-rpc-usb-uart" -D <dir>`
- Copy UF2 to `firmware/charybdis_right_trackball.uf2`
- **Flash**: double-tap reset on right half → `NICENANO` drive mounts → copy UF2 → auto-ejects = success
- Verify by behavior, NOT by `CURRENT.UF2`/`INFO_UF2.TXT` dates (those are the bootloader)
- Flash only the right half for trackball experiments. Keep backup UF2s (`firmware/*_BACKUP_*.uf2`, gitignored)

## Structure

- `config/` — canonical ZMK config (CI source): shields, keymap, overlays, conf files
- `layout/keybindings_explained.csv` — source of truth (616 keys, 11 layers)
- `layout/` — layout specs, host keyboard mapping
- `scripts/zmk-studio/` — console scripts for ZMK Studio (apply/verify layout)
- `firmware/` — pre-built UF2 files
- `docs/` — firmware-specific documentation

## Layout

Applied via ZMK Studio web UI, NOT firmware flash. Paste `scripts/zmk-studio/apply_every_key.js` into Chrome DevTools at zmk.studio.

## PMW3610 Constraints

- Driver: **badjeff/zmk-pmw3610-driver @ zmk-0.3 branch** (pinned sha in `config/west.yml`). Do not use `main` (targets ZMK main/Zephyr 4.1, renamed `pixart,pmw3610-alt`).
- **CPI range: [200, 3200], step 200** — set via the `cpi` devicetree property in `charybdis_right.overlay`, not Kconfig.
- No CPI divider exists in this driver (the old driver's divider caused dead zones).
- No `snipe-layers`/`scroll-layers` — pointer speed modes are key behaviors (see below); scroll mode is a layer-11-scoped child of `trackball_listener`.
- For finer-than-200 precision, use `&zip_xy_scaler` with `track-remainders` in keymap

## Current Config (`config/boards/shields/charybdis/charybdis_right.conf` + `.overlay`)

CPI=400 (devicetree), smart algorithm, axis mapping `swap-xy`+`invert-x`+`invert-y` (= old 90° orientation + invert-X), `force-awake`+`force-awake-4ms-mode` (250 Hz while active, power save when idle).
No software scaler on the real trackball listener — raw CPI IS the effective CPI: 400 everywhere, all the time.
Whole-vector jump acceleration (`config/modules/input_processor_jump_accel`) is wired onto `&trackball_listener` (the real hardware listener) in charybdis.keymap, reading raw sensor counts.
Pointer speed modes are key behaviors (compiled in, unassigned — the optimizer owns placement): `Snipe Hold`/`Fast Hold` (hold = 0.25x/3x, restores cursor on release) and `Snipe Mode`/`Normal Mode`/`Fast Mode` (persistent set), all via the pipeline-switch module on `&trackball_listener`. They only work from right-half key positions (the trackball listener lives on the right/central half).

## Layer Map

| Layer | Purpose |
|-------|---------|
| 0 | Base QWERTY + æ/ø/å (Norwegian Windows) |
| 1 | Navigation, editing, function keys |
| 2 | Mouse lock and buttons |
| 3 | Window/app/desktop management |
| 4 | BT/system, F13-F24, power shortcuts |
| 5 | Code/IDE (44 VS Code shortcuts) |
| 6 | Scroll overlay (firmware scroll-layers) |
| 7 | RPG/game |
| 8 | Speed/travel overlay (legacy — firmware snipe-layers removed; speed modes are now key behaviors) |
| 9 | M-Files/DMS (22 shortcuts) |
| 10 | Excel (48 shortcuts) |

## Sibling Repos

All repos live in the same parent directory.
- `../charybdis-coach` — Browser-based interactive keyboard layout coach
- `../charybdis-optimizer` — Node.js pipeline + Python DEAP evolutionary layout optimizer
- `../charybdis-tools` — Windows AHK helper, trackball benchmarks, PowerShell scripts, runtime logs
