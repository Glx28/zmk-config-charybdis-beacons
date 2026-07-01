# Adding Bluetooth Coach Beacons - Step by Step

## Answer: YES, You Need to Flash New Firmware

**Why?** ZMK Studio doesn't support creating new macros via the GUI. The beacon macros must be added to the keymap source file, which requires rebuilding and flashing firmware.

## Prerequisites

✅ You already have:
- Beacon macros ready: `firmware/coach_beacon_macros.keymap.dtsi`
- GitHub Actions build workflow in `zmk-config-charybdis-beacons`
- Working firmware: `firmware/charybdis_right_trackball.uf2` and `charybdis_left.uf2`

## Step-by-Step Integration

### Step 1: Backup Current Firmware (CRITICAL)

Before making any changes:

```powershell
# Copy current working firmware to backup
Copy-Item firmware/charybdis_right_trackball.uf2 firmware/charybdis_right_trackball_BACKUP_BEFORE_BEACONS.uf2
Copy-Item firmware/charybdis_left.uf2 firmware/charybdis_left_BACKUP_BEFORE_BEACONS.uf2

# Verify backup
Get-Item firmware/*BACKUP*.uf2
```

### Step 2: Add Beacon Macros to Keymap

The keymap file is at:
```
vendor/vzhao-zmk-for-charybdis-main-20250226/config/charybdis.keymap
```

#### Option A: Manual Edit (Recommended for learning)

1. Open the keymap file in VS Code:
```powershell
code vendor/vzhao-zmk-for-charybdis-main-20250226/config/charybdis.keymap
```

2. Find the `/ {` root node (usually near the top)

3. **Add the include** right after the root node opens:
```c
/ {
    #include "../../../../../../firmware/coach_beacon_macros.keymap.dtsi"

    // ... rest of existing keymap
};
```

#### Option B: Automated Patch (Faster, but check the result)

Run this to add the include automatically:
```powershell
$keymap = "vendor/vzhao-zmk-for-charybdis-main-20250226/config/charybdis.keymap"
$content = Get-Content $keymap -Raw
$include = '#include "../../../../../../firmware/coach_beacon_macros.keymap.dtsi"'

if ($content -notmatch "coach_beacon_macros") {
    $content = $content -replace '(/ \{)', "`$1`n    $include`n"
    Set-Content $keymap $content -NoNewline
    Write-Host "Beacon macros include added to keymap"
} else {
    Write-Host "Beacon macros already included"
}
```

### Step 3: Wire Beacons to Layer Keys

Now you need to **replace** the existing layer behaviors with the beacon-wrapped versions.

**Find these in your keymap:**
- `&mo 1` (momentary layer 1)
- `&mo 3` (momentary layer 3)
- `&mo 4` (momentary layer 4)
- `&to 2` (mouse lock)
- `&to 7` (game layer)
- `&to 0` (return to base)
- `&tog 8` (travel toggle)

**Replace with beacon macros:**
- `&mo 1` → `&coach_l1_hold`
- `&mo 3` → `&coach_l3_hold`
- `&mo 4` → `&coach_l4_hold`
- `&to 2` → `&coach_mouse_lock`
- `&to 7` → `&coach_game_lock`
- `&to 0` → `&coach_base`
- `&tog 8` → `&coach_travel_toggle`

**Example:**

Before:
```c
bindings = <
    // ... other keys
    &mo 1  &kp SPACE  &kp LALT
    // ... other keys
>;
```

After:
```c
bindings = <
    // ... other keys
    &coach_l1_hold  &kp SPACE  &kp LALT
    // ... other keys
>;
```

### Step 4: Build New Firmware

Push the config changes to `zmk-config-charybdis-beacons` on GitHub. GitHub Actions builds both halves automatically.

1. Push changes to GitHub
2. Go to the Actions tab on the repo
3. Download the UF2 artifacts from the completed build run

If build fails:
- Check syntax in charybdis.keymap
- Review build errors for missing macros/typos

### Step 5: Flash Firmware

#### Right Half (Main Side with Trackball):

1. **Disconnect Bluetooth** from your computer (important!)
2. Hold **left button + right button** on the keyboard
3. **Plug in USB** while still holding buttons
4. Release buttons when drive appears
5. You should see a drive like **NICENANO** or **CHARYBDIS**
6. **Copy** `firmware/charybdis_right_trackball.uf2` to the drive
7. Drive will auto-eject and keyboard will reset

#### Left Half (Peripheral Side):

1. Disconnect USB from right half
2. Hold buttons on **left half**
3. **Plug USB into left half**
4. Release when drive appears
5. **Copy** `firmware/charybdis_left.uf2` to the drive
6. Drive auto-ejects

### Step 6: Test Beacons Over Bluetooth

1. **Ensure keyboard is on Bluetooth output** (not USB)
```
Press your BLE output key to switch to Bluetooth
```

2. **Start the coach**:
```powershell
.\scripts\windows\start_charybdis_coach.ps1
```

3. **Test Layer 1**:
   - Hold Layer 1 key → Coach should show "Layer 1" active
   - Release → Coach returns to "Layer 0"
   - Timeline shows "BLE layer 1 held" and "BLE layer 1 released"

4. **Test a lock/toggle access key**:
   - Press the lock/toggle key → Coach shows the target layer as locked/toggled
   - Press exit/base key → Coach returns to "Layer 0"

5. **Test Other Layers**:
   - Numbered access behaviors should activate their target layer
   - L0 is base
   - L7 is the frozen fallback/game/system-safe layer
   - Do not infer mouse/window/system/travel roles from any other layer number; evolved layouts assign those dynamically

### Step 7: Verify No Beacon Leakage

Open Notepad or any app and test:
- Press `Ctrl+Alt+Shift+F13` manually
- **Nothing should happen** (AHK swallows it)
- If you see weird behavior, check AHK helper is running

## Troubleshooting

### Build Fails

**Check keymap syntax:**
```powershell
code vendor/vzhao-zmk-for-charybdis-main-20250226/config/charybdis.keymap
```

Look for:
- Matching braces `{}`
- Proper semicolons `;`
- Correct macro names

### Keyboard Won't Boot After Flash

1. Flash `firmware/settings_reset.uf2` to both halves
2. Re-flash the **backup** firmware
3. Re-pair Bluetooth
4. Try again with beacon firmware

### Beacons Not Working

**Check Bluetooth output:**
```
Keyboard must be on BLE, not USB
Press BLE output toggle key
```

**Check AHK is running:**
```powershell
Get-Process | Where-Object {$_.ProcessName -like '*AutoHotkey*'}
```

**Check state file:**
```powershell
cat runtime/charybdis_state.json
```

Should update when you press layer keys.

### Coach Shows Wrong Layer

**Beacon timing issue** - increase wait-ms in beacon macros:
```c
// In coach_beacon_macros.keymap.dtsi
wait-ms = <50>;  // was 40
tap-ms = <50>;   // was 40
```

Rebuild and reflash.

## Recovery Plan

If anything goes wrong:

```powershell
# 1. Flash settings reset to BOTH halves
# Copy firmware/settings_reset.uf2 to each half

# 2. Flash backup firmware to BOTH halves
# Copy firmware/charybdis_*_BACKUP_BEFORE_BEACONS.uf2 to each half

# 3. Remove Bluetooth pairings from Windows
# Settings > Bluetooth > Remove all Charybdis devices

# 4. Re-pair keyboard
# Press Bluetooth profile 0 on keyboard
# Pair in Windows

# 5. Verify with ZMK Studio
# Open https://zmk.studio/
# Connect and check layout
```

## Success Checklist

- [x] Backup firmware saved
- [ ] Beacon macros included in keymap
- [ ] Layer behaviors replaced with beacon macros
- [ ] Right firmware built successfully
- [ ] Left firmware built successfully
- [ ] Right half flashed
- [ ] Left half flashed
- [ ] Keyboard boots and pairs
- [ ] Coach shows real-time layer changes
- [ ] No beacon chords leak to apps
- [ ] All layer types work (momentary, locked, toggled)

## Time Estimate

- Keymap editing: 10-15 minutes
- Build firmware: 5-10 minutes (GitHub Actions)
- Flash both halves: 5 minutes
- Testing: 10 minutes
- **Total: 30-40 minutes**

## Next Steps After Success

1. Test all layers thoroughly
2. Verify ZMK Studio still works
3. Update firmware hashes:
```powershell
.\scripts\powershell\update_firmware_hashes.ps1
```

4. Commit changes to version control
5. Enjoy real-time visual feedback!

---

**Need help?** Check:
- [Coach App Guide](coach_app_guide.md) for coach features
- [Firmware Docs](firmware.md) for build details
- [Coach Status](COACH_STATUS.md) for current state
