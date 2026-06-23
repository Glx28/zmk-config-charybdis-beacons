# Charybdis Coach — Status

Last updated: 2026-06-23

## What works today

- **Web coach** (`apps/charybdis-coach/`) — layout browser, drill/quiz/guided practice, Norwegian Windows matching via `layout/windows_norwegian_host.json`
- **Layer sync** — Python beacon listener (`scripts/windows/coach_beacon_listener.py`) or AHK fallback (`coach_beacon_only.ahk`) swallows `coach_*` HID chords and writes `runtime/charybdis_state.json`
- **Beacon health UI** — coach shows a warning banner and `No beacon (Xs)` when the listener stops heartbeating
- **Launcher** — `scripts/windows/start_charybdis_coach.ps1` starts HTTP server + beacon listener

Start:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\windows\start_charybdis_coach.ps1
```

Coach URL: http://127.0.0.1:8765/apps/charybdis-coach/

## Layout apply / verify

| Step | Script |
|------|--------|
| Apply all 616 keys | Paste `scripts/zmk-studio/apply_every_key.js` in ZMK Studio console → **Save** |
| Verify in Studio | Paste `scripts/zmk-studio/verify_every_key.js` (regenerate `EXPECTED_CSV` after intentional changes) |
| Offline audits | `node scripts/audit_apply_every_key.js`, `audit_exit_to_base.js`, `audit_norwegian_compat.js` |
| Bundle check | `scripts/powershell/validate_layout_bundle.ps1` |

Source of truth: `layout/keybindings_explained.csv` (616 keys).

## Firmware beacons (remaining hardware step)

Macro template: `firmware/coach_beacon_macros.keymap.dtsi` (mirrored in `zmk-config-charybdis-beacons/config/`).

The build repo already `#include`s this file. Layer thumb keys in ZMK Studio must use `coach_*` behaviors (not plain `&mo` / `&to` / `&tog`) so the host listener receives chords. See `docs/ADD_BEACONS_GUIDE.md`.

Build: push `zmk-config-charybdis-beacons` to GitHub → Actions artifact → flash right half for trackball tests.

## Debug

```powershell
# 10s capture while spamming thumb keys
scripts\windows\capture_layer_beacons.ps1 -Seconds 10

# Restart listener only (keeps HTTP server)
scripts\windows\restart_beacon_listener.ps1
```

Logs: `runtime/charybdis_beacon.log`, `runtime/coach_beacon_stderr.log`