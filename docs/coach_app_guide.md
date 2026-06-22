# Charybdis Coach App Guide

## Overview
The Charybdis Coach is a local web application that provides real-time visual feedback for your keyboard layout. It displays:
- Current active layer
- All key bindings with icons and descriptions
- Active application context
- Recent actions timeline
- Layer state (held, locked, toggled)

## Quick Start

### 1. Launch the Coach
```powershell
.\scripts\windows\start_charybdis_coach.ps1
```

This will:
- Start the AutoHotkey helper (if not running)
- Start a local web server on `http://127.0.0.1:8765`
- Open the coach in your default browser

### 2. Verify It's Working
- The coach should show your keyboard layout
- Status bar shows current app and layer
- Timeline shows recent actions
- Try clicking different layers in the left rail

## Bluetooth Layer Beacons

### What Are Beacons?
Beacons are special HID chords (like `Ctrl+Alt+Shift+F13`) that the keyboard sends when layer state changes. The AutoHotkey helper:
1. Intercepts these chords globally
2. Updates the coach's live state
3. Prevents them from reaching your applications

### Current Status
✅ **Host-side ready**: AutoHotkey is configured to catch all beacon chords
⚠️ **Firmware-side pending**: You need to add macros to your ZMK keymap

## Adding Firmware Beacons

### Step 1: Review the Template
The beacon macros are documented in:
```
firmware/includes/bluetooth_layer_beacons.dtsi
```

### Step 2: Understand the Beacon Map
```
Layer 1 hold:    Ctrl+Alt+Shift+F13
Layer 1 release: Ctrl+Alt+Shift+F14
Layer 2 hold:    Ctrl+Alt+Shift+F15
Layer 2 release: Ctrl+Alt+Shift+F16
Layer 3 hold:    Ctrl+Alt+Shift+F17
Layer 3 release: Ctrl+Alt+Shift+F18
Layer 4 hold:    Ctrl+Alt+Shift+F19
Layer 4 release: Ctrl+Alt+Shift+F20

Mouse layer (2) locked:   Ctrl+Alt+Win+F13
Mouse layer (2) unlocked: Ctrl+Alt+Win+F14
Game layer (7) enter:     Ctrl+Alt+Win+F15
Game layer (7) exit:      Ctrl+Alt+Win+F16
Travel layer (8) toggle:  Ctrl+Alt+Win+F17
Travel layer (8) exit:    Ctrl+Alt+Win+F18
```

### Step 3: Integration Options

#### Option A: Use ZMK Studio (Recommended)
Since you have ZMK Studio support enabled:
1. The firmware template provides ZMK macros you can reference
2. You'll need to wire these into layer change events
3. **Important**: When connected via Bluetooth, ensure both ZMK Studio and keyboard output use the same BLE endpoint

#### Option B: Edit Keymap Directly
1. Copy the macro definitions from `bluetooth_layer_beacons.dtsi`
2. Add them to your active keymap file
3. Wire them to layer behaviors (momentary-layer on-press/on-release)
4. Build and flash firmware

### Step 4: Test Over Bluetooth

1. **Switch to Bluetooth**:
   ```
   Press the output toggle key on your keyboard
   Verify Windows shows it's connected via Bluetooth
   ```

2. **Test a momentary layer**:
   ```
   Hold Layer 1 key
   → Coach should show "Layer 1" as active
   → Timeline shows "BLE layer 1 held"

   Release Layer 1 key
   → Coach returns to base layer
   → Timeline shows "BLE layer 1 released"
   ```

3. **Test a locked layer**:
   ```
   Enter mouse lock (Layer 2)
   → Coach shows "Layer 2 (locked)"
   → Timeline shows "Mouse layer locked"

   Exit mouse lock
   → Coach returns to base
   → Timeline shows "Mouse layer unlocked"
   ```

## Testing Without Firmware Changes

You can test the coach UI and host-side beacon detection without firmware changes:

### Synthetic Beacon Test
```powershell
# Run the test beacon script
& "C:\Users\sondr\AppData\Local\Programs\AutoHotkey\v2\AutoHotkey64.exe" ".\runtime\test_beacon.ahk"
```

This sends Layer 1 hold/release beacons and updates the coach.

### Manual Beacon Test
1. Open the coach in your browser
2. Press `Ctrl+Alt+Shift+F13` (nothing visible happens)
3. Check the coach - it should show Layer 1 as held
4. Press `Ctrl+Alt+Shift+F14`
5. Check the coach - it should return to Layer 0

**Note**: These beacons are swallowed by AHK, so they won't leak into other applications.

## Troubleshooting

### Coach Won't Load
```powershell
# Check if server is running
curl http://127.0.0.1:8765/apps/charybdis-coach/

# Check if AHK helper is running
Get-Process | Where-Object {$_.ProcessName -like '*AutoHotkey*'}

# Restart everything
.\scripts\windows\start_charybdis_coach.ps1
```

### State Not Updating
```powershell
# Check state file
cat runtime/charybdis_state.json

# Check state file age
(Get-Item runtime/charybdis_state.json).LastWriteTime
```

If the timestamp is old, AHK helper may have stopped. Restart it:
```powershell
.\scripts\windows\start_charybdis_coach.ps1
```

### Beacons Leaking to Apps
If you see strange function key behavior in other apps:
1. Check AHK helper is running
2. Verify the beacon hotkeys are registered (check helper tray icon)
3. The helper should swallow all `Ctrl+Alt+Shift+F13-F24` and `Ctrl+Alt+Win+F13-F18` chords

## Features

### Dark Theme
- Solid dark UI optimized for low-light use
- No transparency or white panels
- Easy on the eyes during long sessions

### Fullscreen Mode
- Click the fullscreen button in the top-right
- Press `F11` to toggle browser fullscreen
- Keyboard layout scales to fit screen

### Key Inspector
- Click any key to see details
- Shows behavior, output, modifiers, purpose
- Displays key-specific notes and app context

### Search & Filter
- Search by key label, output, or purpose
- Filter by layer, behavior type, or app
- Quick navigation to specific bindings

### Live State
- Active layer highlighted in layer rail
- Last action shown in timeline
- Current app shown in status bar
- State updates every 500ms from runtime file

## Advanced Configuration

### Customize Update Interval
Edit `apps/charybdis-coach/index.html` and change:
```javascript
const STATE_POLL_INTERVAL = 500; // milliseconds
```

### Add Custom App Icons
Add entries to `config/charybdis_apps.json`:
```json
{
  "YourApp.exe": {
    "name": "Your App",
    "category": "productivity",
    "notes": "Custom notes"
  }
}
```

### Export Layout Documentation
The coach reads the same CSV used by other tools:
```
layout/keybindings_explained.csv
```

You can generate docs from this CSV using the existing Python scripts.

## Integration with ZMK Studio

When using ZMK Studio over Bluetooth:
1. Ensure keyboard output is on BLE
2. Studio and keyboard must use the same BLE profile
3. After making changes in Studio, Save to persist them
4. Beacons work independently of Studio connection

## USB vs Bluetooth

- **USB**: No live layer beacons (ZMK limitation), coach shows last known state
- **Bluetooth**: Full beacon support, coach shows real-time layer changes
- The coach works in both modes, but BLE provides the best experience

## Next Steps

1. ✅ Verify the coach UI works
2. ⚠️ Add firmware beacons to your keymap
3. 🔄 Test over Bluetooth with real layer changes
4. 🎯 Customize app-specific behaviors
5. 📊 Export documentation for reference

## Reference Files

- Helper config: `config/charybdis_helper_config.json`
- Helper script: `scripts/windows/charybdis_helper.ahk`
- Firmware template: `firmware/includes/bluetooth_layer_beacons.dtsi`
- Layout spec: `layout/layout_spec.json`
- Bindings: `layout/keybindings_explained.csv`
- Runtime state: `runtime/charybdis_state.json`
