# Charybdis Coach Validation Checklist

## System Status: ✅ READY

### Core Components
- [x] AutoHotkey helper script configured
- [x] Beacon hotkeys registered (Ctrl+Alt+Shift+F13-F24, Ctrl+Alt+Win+F13-F18)
- [x] Runtime state file writer implemented
- [x] Web coach UI created with dark theme
- [x] Local web server configured
- [x] Startup script created
- [x] Layout data files validated

### Host-Side Validation Results

#### ✅ AutoHotkey Helper
```
Process: AutoHotkey64.exe running
Config: config/charybdis_helper_config.json valid
Features: Bluetooth mode, web coach enabled
Beacons: All beacon chords registered
State: runtime/charybdis_state.json writing correctly
```

#### ✅ Web Server
```
URL: http://127.0.0.1:8765
Status: Running
Endpoints:
  - /apps/charybdis-coach/ (coach UI)
  - /runtime/charybdis_state.json (live state)
  - /layout/ (layout data)
  - /config/ (app config)
```

#### ✅ Web Coach UI
```
Theme: Dark, solid, no transparency
Layout: Split-hand Charybdis with real x/y positioning
Components:
  - Status bar with fullscreen control
  - Layer rail (0-4, 7, 8)
  - Interactive keyboard map
  - Key inspector panel
  - Action timeline
Responsive: Tested at 1365x900 and 430x900
```

#### ✅ Data Access
```
Layout spec: layout/layout_spec.json accessible
Keybindings: layout/keybindings_explained.csv accessible
App config: config/charybdis_apps.json accessible
State file: runtime/charybdis_state.json readable
```

#### ✅ Beacon Detection
```
Test: Synthetic Layer 1 hold/release beacons sent
Result: State updated correctly
  - lastAction: "BLE layer 1 released"
  - updatedAt: Fresh timestamp
  - No beacon chords leaked to other apps
```

### Firmware-Side (Pending User Action)

#### ⚠️ Beacon Macros
```
Template: firmware/includes/bluetooth_layer_beacons.dtsi created
Status: Ready for integration into active keymap
Action: User needs to wire beacons into layer behaviors
```

#### Integration Options:
1. **Via ZMK Studio** (if editing over Bluetooth)
   - Reference the macro definitions from template
   - Wire into layer change events
   - Ensure BLE endpoint consistency

2. **Via Keymap File** (if editing locally)
   - Copy macros from template
   - Add to active keymap
   - Wire to momentary-layer behaviors
   - Build and flash

### Testing Plan

#### Phase 1: Host-Side (COMPLETE)
- [x] Start AutoHotkey helper
- [x] Verify beacon hotkeys registered
- [x] Send synthetic beacons
- [x] Confirm state updates
- [x] Verify beacons don't leak

#### Phase 2: UI Verification (COMPLETE)
- [x] Start local web server
- [x] Open coach in browser
- [x] Verify layout renders
- [x] Test layer navigation
- [x] Test key inspection
- [x] Test responsive layout
- [x] Verify dark theme

#### Phase 3: Firmware Integration (PENDING)
- [ ] Review beacon template
- [ ] Choose integration method (Studio vs keymap file)
- [ ] Wire macros to layer behaviors
- [ ] Build and flash firmware
- [ ] Switch keyboard to Bluetooth output

#### Phase 4: End-to-End Testing (PENDING)
- [ ] Hold Layer 1 key → coach shows Layer 1 active
- [ ] Release Layer 1 key → coach returns to base
- [ ] Enter mouse lock (Layer 2) → coach shows locked state
- [ ] Exit mouse lock → coach returns to base
- [ ] Toggle travel layer (Layer 8) → coach shows toggle
- [ ] Test all momentary layers (1, 3, 4)
- [ ] Test game layer (7) enter/exit
- [ ] Verify launcher actions update state
- [ ] Verify app switching updates active app

### Known Limitations

#### Current State
1. **USB Mode**: Beacons designed for Bluetooth; USB provides static state only
2. **Firmware Pending**: User must add macros to keymap
3. **BLE Timing**: Conservative 30-40ms macro timing may need tuning

#### By Design
1. Beacons use high F-keys (F13-F24) to avoid conflicts
2. Combined modifiers (Ctrl+Alt+Shift, Ctrl+Alt+Win) for uniqueness
3. AutoHotkey swallows beacons before they reach normal apps
4. State polling interval: 500ms (adjustable in coach JS)

### Reference Commands

#### Start Everything
```powershell
.\scripts\windows\start_charybdis_coach.ps1
```

#### Check Status
```powershell
# AHK helper running?
Get-Process | Where-Object {$_.ProcessName -like '*AutoHotkey*'}

# Server running?
curl http://127.0.0.1:8765/apps/charybdis-coach/

# State fresh?
cat runtime/charybdis_state.json
```

#### Test Beacons (Synthetic)
```powershell
& "C:\Users\sondr\AppData\Local\Programs\AutoHotkey\v2\AutoHotkey64.exe" ".\runtime\test_beacon.ahk"
```

#### Validate Project
```powershell
.\scripts\windows\validate_project.ps1
```

### Next Steps for User

1. **Review the template**:
   ```
   firmware/includes/bluetooth_layer_beacons.dtsi
   ```

2. **Understand beacon mapping**:
   ```
   Layer 1 hold/release: F13/F14
   Layer 2 hold/release: F15/F16
   Layer 3 hold/release: F17/F18
   Layer 4 hold/release: F19/F20
   Mouse lock/unlock: Win+F13/F14
   Game enter/exit: Win+F15/F16
   Travel toggle/exit: Win+F17/F18
   ```

3. **Choose integration method**:
   - ZMK Studio (if you prefer GUI editing over Bluetooth)
   - Direct keymap edit (if you prefer file-based workflow)

4. **Test over Bluetooth**:
   - Switch keyboard to BLE output
   - Verify each layer transition updates coach
   - Confirm no beacons leak to apps

5. **Optional refinements**:
   - Tune beacon macro timing if needed
   - Add custom app context rules
   - Customize coach UI colors/fonts
   - Export layout documentation

### Success Criteria

✅ **Host-side complete when**:
- Coach loads without errors
- State updates every 500ms
- Beacons are swallowed by AHK
- Timeline shows recent actions
- Active app tracking works

✅ **Firmware-side complete when**:
- All layer transitions send correct beacons
- Coach shows real-time layer changes
- No unexpected behavior in other apps
- BLE timing is reliable

✅ **Full system complete when**:
- End-to-end beacon flow works over Bluetooth
- Coach accurately reflects keyboard state
- User can navigate layers visually
- Documentation is clear and complete

## Status Summary

**Current Phase**: Firmware Integration Pending
**Host-Side**: ✅ Complete and validated
**Firmware-Side**: ⚠️ Template ready, integration needed
**Blocking**: User action to add macros to keymap

**The coach is fully functional and ready to use. Once you add the firmware beacons, you'll have real-time visual feedback for all layer changes over Bluetooth.**
