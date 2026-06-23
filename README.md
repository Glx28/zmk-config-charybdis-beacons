# ZMK Charybdis — Layout, Coach, and Firmware

Charybdis split keyboard project: ZMK firmware config (GitHub Actions builds), v1.9 layout (616 keys), and an interactive web coach with live layer sync via beacon listeners.

## Hardware

- Charybdis split (V&Z), 2× Nice!Nano v2
- PMW3610 trackball on right half
- BLE + USB-C

## Repository layout

```
├── config/              # ZMK firmware source (GitHub Actions build root)
├── firmware/            # Prebuilt UF2 + coach_beacon_macros.keymap.dtsi template
├── layout/              # keybindings_explained.csv (source of truth)
├── apps/charybdis-coach/
├── scripts/zmk-studio/  # apply_every_key.js, verify_every_key.js
└── scripts/windows/     # coach launcher + beacon listeners
```

## Quick start — coach

```powershell
powershell -ExecutionPolicy Bypass -File scripts\windows\start_charybdis_coach.ps1
```

Open http://127.0.0.1:8765/apps/charybdis-coach/

Layer thumb sync uses `coach_*` HID chords → Python/AHK listener → `runtime/charybdis_state.json`. See `docs/COACH_STATUS.md`.

## Quick start — layout in ZMK Studio

1. Connect keyboard, open https://zmk.studio/
2. DevTools Console → paste `scripts/zmk-studio/apply_every_key.js` → Enter → **Save**
3. Verify (optional): paste `scripts/zmk-studio/verify_every_key.js`
4. Offline audits: `node scripts/audit_apply_every_key.js` (and `audit_exit_to_base.js`, `audit_norwegian_compat.js`)

Source of truth: `layout/keybindings_explained.csv` (616 keys, 11 layers).

## Firmware builds

Push to `main` → GitHub Actions builds UF2 artifacts.

Current trackball tuning (`config/boards/shields/charybdis/charybdis_right.conf`):

- CPI 600 / divisor 4 → 150 effective precision
- Snipe CPI 1000 (Layer 8 travel)
- XY scaler 1:1

Download artifacts from the Actions tab, or use prebuilt files in `firmware/`.

Beacon macro template: `firmware/coach_beacon_macros.keymap.dtsi` (included from `config/charybdis.keymap`; wire `coach_*` behaviors in Studio). See `docs/ADD_BEACONS_GUIDE.md`.

## Validation

```powershell
powershell -ExecutionPolicy Bypass -File scripts\powershell\validate_layout_bundle.ps1
```

## Docs

| Doc | Purpose |
|-----|---------|
| `docs/layout.md` | Layer map and daily anchors |
| `docs/firmware.md` | Flashing and trackball tuning |
| `docs/COACH_STATUS.md` | Coach + beacon status |
| `CLAUDE.md` | Agent/project rules |

**Version**: v2.0 layout + coach (2026-06-23)