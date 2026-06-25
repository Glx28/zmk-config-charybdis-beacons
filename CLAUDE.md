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

- **CPI range: [200, 3200]** — values outside cause build failure
- **CPI_DIVIDOR: MUST stay 1** — higher values cause dead zones (integer division drops slow movements)
- For finer-than-200 precision, use `&zip_xy_scaler` with `track-remainders` in keymap

## Current Config (`config/boards/shields/charybdis/charybdis_right.conf`)

CPI=400, DIVIDOR=1, SNIPE=3200, scroll-tick=70, 250Hz polling, smart algorithm, invert-X, 90° orientation.
Keymap scaler `1:2` → effective 200 CPI normal, 1600 CPI speed (Layer 8).

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
| 8 | Speed/travel overlay (firmware snipe-layers) |
| 9 | M-Files/DMS (22 shortcuts) |
| 10 | Excel (48 shortcuts) |

## Sibling Repos

All repos live in the same parent directory.
- `../charybdis-coach` — Browser-based interactive keyboard layout coach
- `../charybdis-optimizer` — Node.js pipeline + Python DEAP evolutionary layout optimizer
- `../charybdis-tools` — Windows AHK helper, trackball benchmarks, PowerShell scripts, runtime logs
