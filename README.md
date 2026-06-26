# Charybdis ZMK Config

ZMK firmware configuration for a Charybdis split keyboard with PMW3610 thumb trackball. This repo is the source of truth for the keyboard layout — firmware builds run via GitHub Actions, and layout changes are applied through [ZMK Studio](https://zmk.studio/).

## Hardware

| Component | Detail |
|-----------|--------|
| Keyboard | Charybdis split (V&Z), 36 keys + 3 thumb keys per half |
| Controllers | 2x Nice!Nano v2 (nRF52840) |
| Trackball | PMW3610 on right half thumb cluster |
| Connectivity | Wireless BLE (5 profiles) + USB-C |
| Host OS | Windows 11, Norwegian keyboard layout |

## Fresh Setup

See [charybdis-tools bootstrap](https://github.com/Glx28/charybdis-tools) for one-command setup of all repos.

## What's Here

```
config/
  charybdis.keymap             # ZMK keymap with input processor scalers
  charybdis.json               # ZMK Studio device layout export (synced to optimizer)
  charybdis_apps.json          # App shortcut definitions
  boards/shields/charybdis/
    charybdis_right.conf       # PMW3610 trackball tuning (CPI, scroll, polling)

layout/
  keybindings_explained.csv    # All 616 keys across 11 layers (canonical source of truth)
  layout_spec.json             # Physical positions, layer descriptions
  windows_norwegian_host.json  # Scancode-to-glyph for Norwegian Windows

scripts/zmk-studio/
  apply_every_key.js           # Full reapply script (paste in ZMK Studio console)
  verify_every_key.js          # Verify all keys after applying
  zmk_studio_layout_exporter.js  # Export current Studio state to JSON
  zmk_studio_key_names.json    # ZMK Studio key name reference

firmware/                      # Pre-built UF2 files
```

## Firmware Builds

Firmware builds via GitHub Actions — push to trigger:

```powershell
git add config/
git commit -m "update keymap"
git push origin main
```

Download the built firmware:

```powershell
gh run list --limit 1
gh run download <run-id> -n "firmware-nice_nano_v2-charybdis_right-studio-rpc-usb-uart" -D firmware/
```

## Applying Layout Changes

1. Connect keyboard via USB
2. Open [zmk.studio](https://zmk.studio/) in Chrome
3. Paste the apply script in console (F12)
4. Verify with the verify script
5. Save in ZMK Studio

For evolved layouts from the optimizer, use `build/evolved_apply.js` and `build/evolved_verify.js` from the optimizer repo.

## Layers

| Layer | Name | Purpose |
|-------|------|---------|
| 0 | Base | QWERTY typing |
| 1-6 | Shortcut layers | App shortcuts, navigation, window management |
| 7 | (reserved) | |
| 8 | Mouse | Trackball buttons, scroll |
| 9 | System | Bluetooth profiles, output selection, reset |
| 10 | M-Files/Excel | App-specific shortcuts |

## Sibling Repos

| Repo | Purpose |
|------|---------|
| [charybdis-zmk-config](https://github.com/Glx28/zmk-config-charybdis-beacons) (this repo) | ZMK firmware config, layout CSV (source of truth) |
| [charybdis-coach](https://github.com/Glx28/charybdis-coach) | Interactive keyboard layout coach |
| [charybdis-optimizer](https://github.com/Glx28/charybdis-optimizer) | Analysis pipeline + evolutionary optimizer |
| [charybdis-tools](https://github.com/Glx28/charybdis-tools) | Windows AHK helpers, beacon, usage logging, bootstrap |
