# v1.9 Custom Layout - Final Summary

## What Changed (12 Keys Total)

### Layer 0 (Base) - Norwegian + English Hybrid
```
Bottom row right:  N  M  ,  .  /  '
                              ↑NEW ↑NEW
```

**Changed:**
1. Position (10,3): `[` → `.` (period) - **CRITICAL for typing**
2. Position (12,3): `-` → `'` (apostrophe) - **CRITICAL for English "can't, don't, it's"**

**Result with Norwegian Windows keyboard:**
- Ø at `;` key position (10,2)
- Æ at `'` key position (11,2)
- Å at `\` key position (12,1)
- Period at `.` key position (10,3)
- Apostrophe for English at new position (12,3)
- Comma still works (9,3)

---

### Layer 1 (Programming) - Bottom Row Symbols
```
Bottom row:  [  ]  \  -
```

**Added:**
3. Position (1,9,3): `[` (left bracket) - moved from base
4. Position (1,10,3): `]` (right bracket) - NEW
5. Position (1,11,3): `\` (backslash) - NEW
6. Position (1,12,3): `-` (minus) - moved from base

**Usage:** Hold Nav thumb + tap bottom row for programming symbols

---

### Layer 1 & 3 - Dual-Hand Launchers
```
Left hand (Layer 1):   A = Win+S    S = Alt+Space
Right hand (Layer 3):  H = Win+S    pinky = Alt+Space
```

**Added:**
7. Layer 1 (1,1,2): Win+S - Windows Search (left hand)
8. Layer 1 (1,2,2): Alt+Space - PowerToys Run (left hand)
9. Layer 3 (3,6,2): Win+S - Windows Search (right hand)
10. Layer 3 (3,11,3): Alt+Space - PowerToys Run (right hand)

**Usage:** Quick search/launcher access from either hand

---

### Layer 2 - Right-Hand Mouse Scroll
```
Pinky (12,2) = Toggle Layer 6 (scroll mode)
```

**Added:**
11. Layer 2 (2,12,2): Toggle Layer 6 - Scroll on/off

**Usage:**
- Enter mouse mode: Hold Window + tap pinky
- Toggle scroll: Tap pinky again
- Move trackball = scrolls when Layer 6 active

---

### Layer 6 - Scroll Overlay
12. **Layer 6 configured as scroll mode** (transparent otherwise)

---

## How to Apply

**File:** `scripts/zmk-studio/apply_operational_changes.js`
- Contains all 10 key binding changes (items 1-11 above)
- Layer 6 may need manual scroll configuration

**Steps:**
1. Open https://zmk.studio/
2. Connect keyboard
3. Open DevTools Console (F12)
4. Copy entire `apply_operational_changes.js` content
5. Paste in Console
6. Verify changes in UI
7. Click Save

**No firmware rebuild needed!**

---

## Testing After Apply

✅ **Type period:** "Hello. How are you."
✅ **Type apostrophe:** "I can't believe it's working!"
✅ **Type Norwegian:** Switch to Ø, Æ, Å positions
✅ **Access brackets:** Hold Nav + tap bottom row for [ ] \ -
✅ **Launch apps:** Hold Nav/Window + tap A/S or H/pinky
✅ **Mouse scroll:** Enter mouse mode, toggle scroll, test

---

## What You Get

✅ **Norwegian typing** - øæå directly accessible
✅ **English typing** - apostrophes for contractions
✅ **Period and comma** - on base layer (finally!)
✅ **Programming** - brackets and symbols on Layer 1
✅ **Quick launchers** - from either hand
✅ **Right-hand mouse** - with scroll toggle
✅ **No language switching** - Windows stays Norwegian

**Total changes: 10 bindings + 1 layer config = Ready to use!**
