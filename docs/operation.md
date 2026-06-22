# Apply, Verify, Test, Roll Back

## ZMK Studio Apply

Use only when a full layout reapply is needed:

```text
scripts/zmk-studio/apply_every_key.js
```

Steps:

1. Open `https://zmk.studio/`.
2. Connect the keyboard.
3. Open DevTools Console.
4. Paste `scripts/zmk-studio/apply_every_key.js`.
5. Confirm the prompt.
6. Do not click Save yet.

The script reapplies every visible key from the final v1.8 contract. It does not click Save.

## ZMK Studio Verify

Run after applying and before saving:

```text
scripts/zmk-studio/verify_every_key.js
```

The verifier:

- clicks every visible layer
- clicks every visible key
- compares behavior, parameter, and modifiers against the expected v1.8 layout
- downloads JSON and CSV verification reports

Generated reports are local evidence. They should not be committed.

## Apply/Verify Boundary For The Launcher

The ZMK Studio apply and verify scripts only know about keyboard output. For the launcher, they apply and verify Layer 3 `x1 y1` as `L Alt+Spacebar`.

The desktop behavior is host-side:

- with `scripts/windows/charybdis_helpers.ahk` running, physical `Alt+Space` opens the Charybdis mouse-monitor launcher
- without the helper, the key falls back to normal Windows or PowerToys handling for `Alt+Space`
- PowerToys Run remains a host configuration, not a ZMK keybinding behavior

## Local Bundle Validation

Run from the repo root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\powershell\validate_layout_bundle.ps1
```

This checks that:

- apply payload exists and contains 616 keys
- layout JSON/CSV exists and has 616 rows
- verifier expected CSV exists and has 616 rows
- explained keybinding CSV exists and has 616 rows
- desktop helper config JSON is valid
- launcher app aliases have launch commands and window match rules
- firmware UF2 files and hashes exist

## Windows Desktop Helper

Start the modern Bluetooth-first coach from the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\start_charybdis_coach.ps1
```

This starts:

- the AutoHotkey v2 bridge
- a local static server on `127.0.0.1`
- the web coach at `http://127.0.0.1:8765/apps/charybdis-coach/`

Start or refresh only the AutoHotkey v2 helper from the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\windows\start_charybdis_helpers.ps1
```

The helper provides:

- runtime state for the web coach in `runtime/charybdis_state.json`
- Bluetooth HID beacon swallowing for coach layer state
- a fallback multi-monitor Charybdis coach overlay generated from `layout/keybindings_explained.csv`
- a custom launcher on Layer 3 `Alt+Space`
- mouse-monitor window routing for existing or newly launched app windows
- preserved F13-F24 language and contextual app helpers

Launcher basics:

- type aliases such as `edge`, `m-files`, `code`, `teams`, `outlook`, `excel`, `terminal`, or `explorer`
- press Enter to activate or launch and move the window to the monitor containing the mouse
- press Shift+Enter or prefix with `!` to force a new instance when the app supports it
- press Escape to close the launcher

Coach basics:

- `Ctrl+Alt+Shift+C` shows or hides the coach
- `Ctrl+Alt+Shift+F11` toggles the coach between windowed and fullscreen
- the tray menu can jump directly to common layers
- the tray menu can open the modern web coach when the local server is running

Bluetooth coach beacons:

- The normal workflow assumes the keyboard remains on Bluetooth.
- Do not rely on USB serial, WebUSB, or USB-only telemetry for the coach.
- `firmware/coach_beacon_macros.keymap.dtsi` contains the ZMK macro template for exact BLE layer-state beacons.
- AutoHotkey swallows the beacon chords and updates `runtime/charybdis_state.json`.
- If ZMK Studio is connected over Bluetooth, keep the keyboard output on BLE; if Studio is connected over USB, select USB output first.

Editable helper config:

- `config/charybdis_apps.json` controls launcher aliases, launch commands, and window matching
- `config/charybdis_helper.json` controls coach startup, monitor placement, opacity, compact mode, fullscreen startup, web coach port, and Bluetooth transport metadata

## Physical Test Checklist

After applying, saving, or flashing firmware:

```text
[ ] Layer 0 typing works
[ ] Enter, Space, Backspace, Ctrl, Shift, Alt work
[ ] Left and right halves both send keys through the right/main side
[ ] Nav arrows and edit keys work
[ ] Hold Layer 1 + trackball scrolls
[ ] Trackball pointer movement is calm enough for normal work
[ ] Layer 8 pointer travel is faster and exits correctly
[ ] Left click and drag-select work
[ ] Layer 2 mouse buttons work
[ ] Right-hand mouse lock enters and exits
[ ] RPG Layer 7 enters from both hands and exits
[ ] Layer 4 Bluetooth/output/system keys remain reachable
[ ] Full verifier passes before saving future Studio changes
```

## Rollback

Keep these available:

- `firmware/charybdis_right_trackball_ROLLBACK_CPI400_SNIPE200.uf2`
- `firmware/settings_reset.uf2`
- `firmware/SHA256SUMS.txt`

Rollback order:

1. Save or export any current ZMK Studio state if it matters.
2. Flash the rollback right-side firmware if trackball tuning is the problem.
3. Use `settings_reset.uf2` only when Bluetooth/settings storage is the problem.
4. Re-pair host Bluetooth profiles after settings reset.
5. Re-run `scripts/zmk-studio/verify_every_key.js`.
