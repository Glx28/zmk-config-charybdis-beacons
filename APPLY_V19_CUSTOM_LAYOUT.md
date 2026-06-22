# Apply v1.9 User Custom Layout

## Summary of Changes (12 keys)

Your layout now includes these customizations on top of v1.8:

### Critical: Base Layer Fixes (2 keys)
1. **Base (0,10,3): `[` → `.`** - Period on base layer for typing flow
2. **Base (0,12,3): `-` → `'`** - Apostrophe for English contractions (can't, don't, it's)

### Programming Symbols Layer 1 (4 keys)
3. **Layer 1 (1,9,3): `.` → `[`** - Bracket moved to programming layer
4. **Layer 1 (1,10,3): Empty → `]`** - Right bracket for pairs
5. **Layer 1 (1,11,3): Empty → `\`** - Backslash for paths/escapes
6. **Layer 1 (1,12,3): Empty → `-`** - Minus moved from base layer

### PowerToys Launchers - Both Hands (4 keys)
7. **Layer 1 (1,1,2): Empty → Win+S** - Left hand: Hold Nav + tap A
8. **Layer 1 (1,2,2): Empty → Alt+Space** - Left hand: Hold Nav + tap S
9. **Layer 3 (3,6,2): Empty → Win+S** - Right hand: Hold Window + tap H
10. **Layer 3 (3,11,3): Empty → Alt+Space** - Right hand: Hold Window + tap pinky

### Right-Hand Mouse Scroll (1 key)
11. **Layer 2 (2,12,2): Empty → Toggle Layer 6** - Tap pinky to toggle scroll mode

### Norwegian Characters
**Windows stays on Norwegian keyboard** - No language switching needed:
- Position (10,2) `;` keycode → **Ø** (with Norwegian keyboard)
- Position (11,2) `'` keycode → **Æ** (with Norwegian keyboard)
- Position (12,1) `\` keycode → **Å** (with Norwegian keyboard)
- Position (12,3) `'` keycode → **'** apostrophe (for English typing)
- Period and comma work the same in both languages!

---

## How to Apply in ZMK Studio

### Method 1: Automatic (Recommended)
1. Open https://zmk.studio/ and connect your keyboard
2. Open browser DevTools (F12) → Console tab
3. Copy the entire contents of `scripts/zmk-studio/apply_operational_changes.js`
4. Paste into Console and press Enter
5. Script will apply all 7 changes automatically
6. **Verify the changes in UI before clicking Save**
7. Click Save when ready

### Method 2: Manual
1. Open https://zmk.studio/ and connect keyboard
2. Apply each change manually following the table above
3. Click Save

---

## Usage Guide

### Period and Comma
- **Comma**: Base layer (already working)
- **Period**: Base layer (NEW - now easily accessible)
- **Bracket**: Layer 1 (hold Nav thumb to access)

### Launchers
**Left hand (when right hand is busy):**
- Hold Nav thumb (x3,y4) + tap A = **Windows Search**
- Hold Nav thumb (x3,y4) + tap S = **PowerToys Run**

**Right hand (when left hand is busy):**
- Hold Window thumb (x8,y4) + tap H = **Windows Search**
- Hold Window thumb (x8,y4) + tap pinky = **PowerToys Run**

### Right-Hand Mouse Mode
**Enter mouse mode:**
1. Hold Window thumb (x8,y4)
2. Tap pinky (x10,y2)
3. Release → locked in mouse mode

**Use scroll:**
1. Tap pinky (x12,y2) → scroll mode ON
2. Move trackball → scrolls vertically
3. Tap pinky again → scroll mode OFF
4. Move trackball → pointer movement

**Exit mouse mode:**
- Tap right thumb (x7,y4 or x8,y4)

---

## Notes

- **Norwegian characters (øæå)**: Already working via Windows Norwegian keyboard layout
- **All changes applied via ZMK Studio** - no firmware rebuild needed
- **Layer 6 scroll**: May require Layer 6 configuration if toggle doesn't work
- **Total changes**: 7 keys (2 critical, 4 convenience, 1 scroll)

---

## Testing Checklist

### Basic Typing (Layer 0)
- [ ] Period works: Type "Hello. How are you."
- [ ] Comma works: Type "Yes, no, maybe"
- [ ] Norwegian mode (Win+Space → Norwegian):
  - [ ] Type ø (press ; key)
  - [ ] Type æ (press ' key)
  - [ ] Type å (press \ key)
- [ ] English mode (Win+Space → English):
  - [ ] Semicolon works (press ; key)
  - [ ] Apostrophe works: Type "can't, don't, it's"
  - [ ] Backslash works (press \ key)

### Programming Layer (Layer 1)
- [ ] Hold Nav thumb + tap bottom row:
  - [ ] Left bracket `[` works (position where period was)
  - [ ] Right bracket `]` works (next position)
  - [ ] Backslash `\` works (next position)
  - [ ] Test pair: `arr[0]` and `path\to\file`

### Launchers
- [ ] Left-hand Win+S: Hold Nav (x3,y4) + tap A = Windows Search opens
- [ ] Left-hand Alt+Space: Hold Nav (x3,y4) + tap S = PowerToys Run opens
- [ ] Right-hand Win+S: Hold Window (x8,y4) + tap H = Windows Search opens
- [ ] Right-hand Alt+Space: Hold Window (x8,y4) + tap pinky = PowerToys Run opens

### Mouse Mode
- [ ] Enter mouse mode: Hold Window (x8,y4) + tap pinky (x10,y2)
- [ ] Trackball moves pointer
- [ ] Scroll ON: Tap pinky (x12,y2) → trackball scrolls page
- [ ] Scroll OFF: Tap pinky (x12,y2) again → trackball moves pointer
- [ ] Exit: Tap thumb (x7,y4 or x8,y4) → back to base layer

### Notes
- If scroll toggle doesn't work, Layer 6 may need scroll input processor configured
- All changes applied via ZMK Studio - no firmware rebuild needed
- Total: 9 key bindings changed + Layer 6 scroll configuration
