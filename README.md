# ZMK Charybdis Configuration with Coach UI

Complete ZMK firmware configuration for a Charybdis split keyboard with trackball, featuring a custom layout (v1.9) and an interactive web-based coach application for learning the layout.

## 🎯 Overview

This repository contains:
- **ZMK Firmware Configuration** - Custom keymap with 11 layers optimized for Norwegian/English typing, programming, navigation, and gaming
- **Charybdis Coach** - Interactive web UI that shows your layout and highlights keys as you type
- **ZMK Studio Scripts** - Automation scripts to apply the entire layout via ZMK Studio web interface
- **Layout Documentation** - Complete CSV documentation of all 616 key bindings

## 🔧 Hardware

- **Keyboard**: Charybdis split keyboard (V&Z-Charydbis)
- **Controllers**: 2x Nice!Nano v2 (nRF52840)
- **Trackball**: PMW3610 sensor on right half
- **Features**: Wireless (BLE), USB-C, per-key RGB (optional)

## 📂 Project Structure

```
zmk-config-charybdis-beacons/
├── config/
│   └── charybdis.keymap          # ZMK firmware keymap source
├── layout/
│   └── keybindings_explained.csv # Human-readable layout documentation (v1.9)
├── apps/
│   └── charybdis-coach/          # Web-based layout coach
│       ├── index.html
│       ├── app.js                # Coach logic with live keypress highlighting
│       └── style.css
├── scripts/
│   ├── zmk-studio/
│   │   ├── apply_every_key.js    # Full 616-key layout reapply script (v1.9)
│   │   ├── apply_operational_changes.js  # Surgical v1.9 changes only
│   │   └── verify_every_key.js   # Layout verification script (v1.9)
│   └── windows/
│       ├── start_charybdis_coach.ps1     # Launch coach with USB monitor
│       ├── usb_state_monitor.py          # USB CDC-ACM state reader
│       └── serve_local.py                # Simple HTTP server
├── runtime/                      # Runtime state files (auto-generated)
└── README.md                     # This file
```

## 🚀 Quick Start

### Option 1: Clone on Another Laptop

```bash
# Clone this repository
git clone https://github.com/YOUR_USERNAME/zmk-config-charybdis-beacons.git
cd zmk-config-charybdis-beacons

# Install Python dependencies (for coach)
pip install pyserial

# Start the coach
# Windows:
.\scripts\windows\start_charybdis_coach.ps1

# Linux/Mac:
python scripts/windows/serve_local.py &
python scripts/windows/usb_state_monitor.py &

# Open browser to http://127.0.0.1:8765/apps/charybdis-coach/
```

### Option 2: Apply Layout via ZMK Studio

1. **Connect keyboard via USB**
2. **Open https://zmk.studio/** in Chrome/Edge
3. **Open DevTools Console** (Press F12, then click Console tab)
4. **Paste and run the apply script**:
   - Copy all contents of `scripts/zmk-studio/apply_every_key.js`
   - Paste into console
   - Press Enter
   - Wait for "✅ All 616 keys applied successfully!"
5. **Verify the layout** (optional):
   - Paste contents of `scripts/zmk-studio/verify_every_key.js`
   - Press Enter
   - Check for any mismatches
6. **Save to keyboard**:
   - Click "Save & Upload" button in ZMK Studio
   - Wait for upload to complete

## 🎹 Layout v1.9 Highlights

### Base Layer Improvements
- **Period (.)** on base layer - faster typing, no need to hold Nav key
- **Apostrophe (')** on base layer - essential for English contractions (can't, don't, it's)

### Launcher Keys (Both Hands)
- **Win+S**: Windows Search - available on both left and right hands
- **Alt+Space**: PowerToys Run launcher - available on both left and right hands

### Programming Brackets (Layer 1, Right Hand)
- `[` Left bracket
- `]` Right bracket
- `\` Backslash
- `-` Minus (moved from base)

### Mouse Layer Enhancement
- **Scroll Toggle**: Right pinky toggles Layer 6 scroll mode while in mouse layer

### Complete Layer Overview

- **Layer 0**: Base typing (QWERTY) with Norwegian and English support
- **Layer 1**: Navigation, F-keys, arrows, text editing shortcuts
- **Layer 2**: Mouse buttons and movement control
- **Layer 3**: Window management, app launchers, virtual desktops
- **Layer 4**: Bluetooth, system controls, F13-F24 macros
- **Layer 5**: Numpad with full number pad layout
- **Layer 6**: Mouse scroll overlay (toggle mode)
- **Layer 7**: Gaming layer with WASD-optimized layout
- **Layer 8**: Travel mode (restricted for security)
- **Layer 9**: Reserved / WIP
- **Layer 10**: Reserved / WIP

## 💡 Using the Charybdis Coach

The coach is an interactive web app that helps you learn the layout:

### Features
- **Live Keypress Highlighting**: Keys light up as you type (300ms pulse effect)
- **USB Live Monitor**: Auto-switches displayed layer when you activate layers on keyboard
- **Search Functionality**: Find keys by name, label, or parameter
- **Layer Navigation**: Click layer buttons to explore different layers
- **Status Display**: Shows transport (USB/BLE), battery level, active layer

### Starting the Coach

**Windows**:
```powershell
.\scripts\windows\start_charybdis_coach.ps1
```

**Manual Start** (any OS):
```bash
# Terminal 1 - Start web server
python scripts/windows/serve_local.py

# Terminal 2 - Start USB monitor (optional, for live layer switching)
python scripts/windows/usb_state_monitor.py
```

Then open: **http://127.0.0.1:8765/apps/charybdis-coach/**

### Coach Screenshots
- Main view shows keyboard layout with color-coded keys
- Search bar at top to find specific keys
- Layer selector buttons
- Status panel shows connection info

## 🛠️ Modifying the Layout

### For Small Changes (Recommended)

1. **Edit the human-readable layout**:
   ```
   layout/keybindings_explained.csv
   ```
   This CSV file documents all 616 keys with rationale

2. **Create a surgical script**:
   - Edit `scripts/zmk-studio/apply_operational_changes.js`
   - Add only your changed keys
   - Much faster than reapplying all 616 keys

3. **Apply via ZMK Studio**:
   - Connect keyboard via USB
   - Open https://zmk.studio/
   - Paste script in DevTools Console
   - Click "Save & Upload"

### For Complete Reapply

Use `scripts/zmk-studio/apply_every_key.js` - applies all 616 keys.

This is useful when:
- Setting up a new keyboard
- Recovering from a bad state
- Major layout changes

### Updating the Coach

The coach automatically reads from `layout/keybindings_explained.csv`.
After editing the CSV, just refresh the browser to see changes.

## 🔍 Key Files Explained

### Layout Files
- **`layout/keybindings_explained.csv`** - Human-readable documentation of every key, with rationale and descriptions
- **`config/charybdis.keymap`** - ZMK firmware source (if building from source)

### ZMK Studio Scripts
- **`apply_every_key.js`** - Full 616-key reapply script (v1.9)
- **`apply_operational_changes.js`** - Only the 12 keys that changed in v1.9
- **`verify_every_key.js`** - Verification script to ensure layout matches expected

### Coach Application
- **`apps/charybdis-coach/index.html`** - Coach UI structure
- **`apps/charybdis-coach/app.js`** - Coach logic, keypress highlighting, layer switching
- **`apps/charybdis-coach/style.css`** - Styling and animations
- **`scripts/windows/usb_state_monitor.py`** - Reads keyboard state from USB CDC-ACM port
- **`scripts/windows/serve_local.py`** - Simple HTTP server for local development

### Automation Scripts
- **`scripts/windows/start_charybdis_coach.ps1`** - One-command coach launcher (Windows)
- **`scripts/update_verify_v19.py`** - Helper to update verify script with layout changes

## 🔧 Troubleshooting

### Coach Issues

**Coach doesn't show layer changes**:
1. Ensure keyboard is connected via USB
2. Check that `runtime/charybdis_state.json` exists and is being updated
3. Restart USB monitor: `python scripts/windows/usb_state_monitor.py`

**Keys don't highlight when typing**:
1. Make sure you're not typing in the search box
2. Check browser console for JavaScript errors
3. Verify the key exists in the currently displayed layer

### ZMK Studio Issues

**"Output Selection" behavior not found**:
- Some Layer 4 entries reference behaviors that may not exist in all ZMK versions
- This doesn't affect v1.9 layout (Layers 0-3)
- You can skip Layer 4 or comment out problematic entries

**Script fails partway through**:
1. Refresh the ZMK Studio page
2. Reconnect keyboard
3. Try again
4. If still fails, use surgical script instead: `apply_operational_changes.js`

**Layout doesn't save**:
- Make sure you clicked "Save & Upload" in ZMK Studio
- Wait for the progress indicator to complete
- Check USB connection
- Try disconnecting/reconnecting keyboard

### Python/Coach Server Issues

**Port 8765 already in use**:
```bash
# Find and kill the process using port 8765
# Windows:
netstat -ano | findstr :8765
taskkill /PID <pid> /F

# Linux/Mac:
lsof -ti:8765 | xargs kill -9
```

**pyserial not found**:
```bash
pip install pyserial
# or
python -m pip install pyserial
```

## 📚 Version History

### v1.9 (Current - 2026-06-23)
- ✅ Period and apostrophe on base layer
- ✅ Win+S and Alt+Space launchers on both hands
- ✅ Programming brackets on Layer 1
- ✅ Scroll toggle on mouse layer
- ✅ Updated coach with keypress highlighting
- ✅ USB live monitor for auto layer switching

### v1.8 (Previous)
- Operational pointer-travel layout
- F-keys on Layer 1 positions 1,2
- Ctrl shortcuts on Layer 1 bottom row
- Transparent keys on Layer 3 positions 6,2 and 11,3

## 🤝 Contributing

This is a personal keyboard configuration, but you're welcome to:
- Fork it for your own Charybdis build
- Open issues for bugs in scripts or coach
- Submit PRs for tooling improvements
- Use as reference for your own ZMK layout

## 📄 License

MIT License - Feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- **ZMK Firmware**: https://zmk.dev/
- **Charybdis Keyboard**: Bastard Keyboards design
- **ZMK Studio**: Official ZMK layout editor
- **Nice!Nano**: SparkFun nRF52840 board

---

**Current Version**: v1.9
**Last Updated**: 2026-06-23
**Layout File**: `layout/keybindings_explained.csv`
**Total Keys**: 616 keys across 11 layers

For questions or issues, please open a GitHub issue.
