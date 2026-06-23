# Charybdis Split Keyboard — ZMK Config + Interactive Coach

A complete ZMK firmware configuration, interactive learning coach, and workflow guide system for a **Charybdis split keyboard** with a PMW3610 thumb trackball.

## Hardware

| Component | Detail |
|-----------|--------|
| Keyboard | Charybdis split (V&Z), 36 keys + 3 thumb keys per half |
| Controllers | 2x Nice!Nano v2 (nRF52840) |
| Trackball | PMW3610 on right half thumb cluster |
| Connectivity | Wireless BLE (5 profiles) + USB-C |
| Host OS | Windows 11, Norwegian keyboard layout |
| Monitors | 3 monitors, 6720px total horizontal span |

## What's in This Repo

```
.
├── config/                        # ZMK firmware config (CI builds from here)
│   ├── boards/shields/charybdis/
│   │   ├── charybdis_right.conf   # PMW3610 trackball tuning (CPI, scroll, speed)
│   │   └── ...
│   └── charybdis.keymap           # ZMK keymap with input processor scalers
├── layout/                        # Layout source of truth
│   ├── keybindings_explained.csv  # All 616 keys across 11 layers (canonical)
│   ├── windows_norwegian_host.json
│   └── layout_spec.json
├── apps/
│   └── charybdis-coach/           # Browser-based interactive layout coach
│       ├── index.html
│       ├── app.js
│       ├── styles.css
│       └── workflows/             # Per-app shortcut guides (JSON)
│           ├── index.json         # Workflow guide registry
│           ├── browser.json
│           ├── vscode.json
│           ├── mfiles.json
│           ├── explorer.json
│           ├── windows.json
│           └── excel.json
├── scripts/
│   ├── zmk-studio/                # ZMK Studio automation scripts
│   │   ├── apply_every_key.js     # Batch-apply all 616 keys via Studio console
│   │   └── verify_every_key.js    # Verify layout matches expected CSV
│   ├── windows/                   # Windows host-side helpers
│   │   ├── start_charybdis_coach.ps1
│   │   ├── charybdis_helpers.ahk
│   │   └── coach_beacon_listener.py
│   └── powershell/                # Validation and tuning scripts
├── runtime/
│   └── trackball_benchmarks/      # Trackball tuning benchmark system
├── firmware/                      # Pre-built UF2 files
├── build.yaml                     # GitHub Actions build matrix
├── .github/workflows/build.yml    # CI: builds firmware on push
└── CLAUDE.md                      # AI agent project context
```

## Layer Architecture

| Layer | Name | Purpose |
|-------|------|---------|
| 0 | Base | QWERTY + Norwegian (æ/ø/å) + thumb layer access |
| 1 | Navigation | Arrows, Home/End/PgUp/PgDn, F-keys, Ctrl+F/H, brackets |
| 2 | Mouse | Mouse buttons (MB1-5 both hands), clipboard, window mgmt, tab cycling |
| 3 | Window | Win+snap, virtual desktops, taskbar app launch (Win+1-5) |
| 4 | System | Bluetooth profiles, output selection, F13-F24, Studio Unlock |
| 5 | Reserved | Transparent (unused) |
| 6 | Scroll | Trackball becomes scroll wheel (firmware overlay) |
| 7 | Game/RPG | Arrow cluster + action keys, mirrored both hands |
| 8 | Speed | Trackball travel mode — SNIPE_CPI 3200 for fast cursor (firmware overlay) |
| 9-10 | Reserved | Transparent (unused) |

Layer 2 (Mouse) is the primary QoL layer with both hands fully populated: mouse buttons on the home row (y2), clipboard shortcuts (y3), window management (y0), and common actions (y1). Designed so you can click, copy, paste, and switch apps without leaving mouse mode.

## Requirements

- **Windows 10/11** (coach and helpers are Windows-specific)
- **Python 3.8+** (for the HTTP server and beacon listener)
- **A web browser** (Chrome or Edge recommended)
- **PowerShell 5.1+** (comes with Windows)
- **Git** (to clone and push)
- **GitHub account** with access to this repo (for CI firmware builds)

Optional:
- **AutoHotkey v2** (for `charybdis_helpers.ahk`)
- **GitHub CLI (`gh`)** (for downloading firmware artifacts from CI)
- **ZMK Studio** at [zmk.studio](https://zmk.studio/) (for applying layout changes)

## Quick Start

### 1. Clone

```powershell
git clone https://github.com/Glx28/zmk-config-charybdis-beacons.git
cd zmk-config-charybdis-beacons
```

### 2. Launch the Coach

```powershell
powershell -ExecutionPolicy Bypass -File scripts\windows\start_charybdis_coach.ps1
```

This starts a local HTTP server on port 8765, the beacon listener, and opens the coach in your browser.

Coach URL: **http://127.0.0.1:8765/apps/charybdis-coach/**

Alternatively, start the server manually:

```powershell
python -m http.server 8765
# Then open http://127.0.0.1:8765/apps/charybdis-coach/
```

### 3. Build Firmware

Firmware builds via **GitHub Actions only** (no Docker, no local build):

```powershell
git add config/
git commit -m "describe your change"
git push origin main

# Download the built UF2 (requires GitHub CLI):
gh run list --limit 1
gh run download <run-id> -n "firmware-nice_nano_v2-charybdis_right-studio-rpc-usb-uart" -D firmware/
```

### 4. Flash Firmware

1. Double-tap the reset button on the right half
2. `NICENANO` drive mounts (usually `D:`)
3. Copy the `.uf2` file to the drive
4. Drive auto-ejects = success

Only the right half needs flashing for trackball config changes. Verify by behavior (e.g. CPI change), not by file dates on the drive (those are the bootloader, never change).

### 5. Apply Layout via ZMK Studio

Layout is managed via [ZMK Studio](https://zmk.studio/), not firmware:

1. Connect keyboard via USB
2. Open ZMK Studio in Chrome
3. Open DevTools Console (F12)
4. Paste `scripts/zmk-studio/apply_every_key.js` and confirm
5. Verify with `scripts/zmk-studio/verify_every_key.js`
6. **Save manually** in Studio only after verification passes

Source of truth: `layout/keybindings_explained.csv` (616 keys, 11 layers).

## Coach Features

The Charybdis Coach is a browser-based interactive tool:

- **Visual keyboard map** — every key on every layer, color-coded by behavior type
- **Live layer tracking** — beacon listener syncs displayed layer with physical thumb holds
- **Key inspector** — click any key to see behavior, modifiers, parameter, and purpose
- **Search** — filter across keys, actions, layers, and shortcuts
- **Practice modes** — Drill (type prompted keys), Quiz (find keys by description), Guided Tour
- **Progress tracking** — mastery percentage persisted in localStorage
- **Workflow Guide** — per-app shortcut reference showing Charybdis layer mappings
- **Physical key highlighting** — press keys on the keyboard and see them flash in the coach
- **Norwegian Windows support** — matches physical key positions via `event.code`

### Workflow Guide

The Workflow Guide panel shows categorized shortcut cheat sheets for specific apps, with annotations showing which Charybdis layer/key produces each shortcut. Select an app from the dropdown; your selection persists across sessions.

**Included apps:** Browser, VS Code, File Explorer, M-Files, Windows 11, Excel

**Adding a new app:**

1. Create a JSON file in `apps/charybdis-coach/workflows/` (use an existing file as template)
2. Add it to `apps/charybdis-coach/workflows/index.json`
3. Refresh the coach

```json
{
  "id": "myapp",
  "name": "My App",
  "icon": "app",
  "categories": [
    {
      "name": "Category Name",
      "shortcuts": [
        { "keys": "Ctrl+S", "action": "Save document", "charybdis": "L0 Ctrl + S" }
      ]
    }
  ]
}
```

The `charybdis` field is optional — include it when the shortcut maps to a specific Charybdis layer key.

### Second Monitor Setup

Open the coach URL in a browser on your second monitor. Use fullscreen mode (button in top-right) or pin with PowerToys "Always on Top" (Win+Ctrl+T). The workflow guide and keyboard map are both visible in the sidebar for constant reference.

## Trackball Configuration

Current config in `config/boards/shields/charybdis/charybdis_right.conf`:

| Setting | Value | Effective | Notes |
|---------|-------|-----------|-------|
| CPI | 600 | 300 | Halved by keymap `&zip_xy_scaler 1 2` with remainder carry |
| CPI_DIVIDOR | 1 | — | **Must stay 1** (see warning below) |
| SNIPE_CPI | 3200 | 1600 | Speed/travel mode on Layer 8, also halved by scaler |
| Scroll tick | 70 | — | Scroll sensitivity |
| Polling rate | 125 Hz | — | Software polling |
| Smart algorithm | on | — | PMW3610 motion prediction |

**CPI_DIVIDOR dead-zone warning:** The driver does raw integer division with no remainder carry (`x = delta / dividor`). At values >1, slow movements floor to 0 and are silently dropped — creating a "slow movement = no input" dead zone. **Always keep it at 1.** For sub-200 precision, use the keymap's `&zip_xy_scaler` with `track-remainders`.

**Windows mouse settings:** Pointer speed 1:1 (`MouseSensitivity=10`), acceleration OFF. Higher sensitivity amplifies low-CPI coarseness.

**CPI valid range:** [200, 3200] — values outside this range cause a build failure.

## Validation

```powershell
powershell -ExecutionPolicy Bypass -File scripts\powershell\validate_layout_bundle.ps1
```

## Benchmarking

```powershell
# Start a benchmark session
powershell -NoProfile -ExecutionPolicy Bypass -File runtime\trackball_benchmarks\start_benchmark_session.ps1

# Run a named benchmark profile
powershell -NoProfile -ExecutionPolicy Bypass -File runtime\trackball_benchmarks\run_benchmark.ps1 -ProfileName <name>
```

## For AI Agents

If you are an AI agent working on this project, read these files in this order:

| Priority | File | What it tells you |
|----------|------|-------------------|
| 1 | `CLAUDE.md` | Project rules, constraints, layer map, tuning history, critical warnings |
| 2 | `layout/keybindings_explained.csv` | Every key binding — the layout source of truth |
| 3 | `config/boards/shields/charybdis/charybdis_right.conf` | Trackball/sensor config |
| 4 | `config/charybdis.keymap` | ZMK keymap with input processors and layer definitions |
| 5 | `build.yaml` | CI build matrix (boards, shields, snippets) |
| 6 | `scripts/zmk-studio/apply_every_key.js` | Studio automation — all 616 keys in JSON |
| 7 | `apps/charybdis-coach/workflows/index.json` | Workflow guide registry |

**Critical rules for agents:**

- Firmware builds via **GitHub Actions only** — no Docker, no local builds
- CPI range is **[200, 3200]** — values outside cause build failure
- `CPI_DIVIDOR` must stay **1** — higher values create a dead zone
- Layout changes go through **ZMK Studio** web UI, not firmware flash
- Edit config in root `config/` — `vendor/` and nested clones are gitignored mirrors
- `layout/keybindings_explained.csv` is the canonical layout; update it and `apply_every_key.js` together
- The coach reads the CSV at runtime — no code changes needed for layout updates

## Docs

| Document | Purpose |
|----------|---------|
| `docs/layout.md` | Layer map and daily anchors |
| `docs/firmware.md` | Flashing and trackball tuning |
| `docs/COACH_STATUS.md` | Coach + beacon integration status |
| `CLAUDE.md` | Full agent/project context and rules |

## Version

**v2.0** — Layout + Coach + Workflow Guide (2026-06-23)
