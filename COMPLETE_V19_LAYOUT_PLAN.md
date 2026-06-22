# Complete v1.9 Layout Plan - Norwegian + American Hybrid

## The Strategy: Windows Handles Language, ZMK Stays American

**Key Concept:**
- ZMK keyboard sends **standard American keycodes**
- Windows keyboard layout (Norwegian/English) determines what characters appear
- Switch Windows keyboard with **Win+Space**

---

## Layer 0 (Base) - Final Layout with Norwegian Keyboard

```
Row 0:  ESC  1  2  3  4  5  |  6  7  8  9  0  BKSP
Row 1:  TAB  Q  W  E  R  T  |  Y  U  I  O  P  Å (BSLH → Å)
Row 2:  SHIFT A  S  D  F  G  |  H  J  K  L  Ø (SEMI → Ø)  Æ (SQT → Æ)
Row 3:  CTRL Z  X  C  V  B  |  N  M  ,  .  /  ' (NEW!)
Thumb:  ALT SPACE to1        |  WIN SPACE
           MB1  MB2          |  ENTER
```

**With Windows set to Norwegian keyboard:**
- Position (12,1) = `\` keycode → **Å** output ✓
- Position (10,2) = `;` keycode → **Ø** output ✓
- Position (11,2) = `'` keycode → **Æ** output (BUT we changed this!)
- Position (12,3) = **`'` keycode** → **'** output (apostrophe for English!)
- Position (10,3) = `.` keycode → **.** output ✓

**Critical change:** Position (12,3) changed from MINUS to APOSTROPHE
- **Why:** You type English with Norwegian keyboard - need apostrophe for "can't, don't, it's"
- **Trade-off:** Minus `-` moved to Layer 1 (still accessible with Nav thumb)

---

## Layer 1 (Programming/Navigation) - After Changes

**Programming symbols (bottom row):**
```
Position:  (1,9,3)  (1,10,3)  (1,11,3)  (1,12,3)
Keys:      [        ]         \         -
```

**Note:** Minus moved from base layer to here

**Launchers (home row left):**
```
Position:  (1,1,2)  (1,2,2)
Keys:      Win+S    Alt+Space (PowerToys)
```

**Navigation (right side - unchanged):**
```
Arrow cluster, F-keys, etc. (existing v1.8)
```

---

## Layer 3 (Window Management) - After Changes

**Launchers (right hand):**
```
Position:  (3,6,2)   (3,11,3)
Keys:      Win+S     Alt+Space (PowerToys)
```

---

## Layer 2 (Mouse Mode) - After Changes

**Scroll toggle:**
```
Position:  (2,12,2)
Key:       Toggle Layer 6 (scroll mode)
```

---

## Complete Change List (12 Keys)

### Layer 0 Changes (2 keys)
1. **(0,10,3): LEFT_BRACKET → PERIOD** ⭐ CRITICAL
2. **(0,12,3): MINUS → APOSTROPHE** ⭐ CRITICAL (for English can't, don't, it's)

### Layer 1 Changes (7 keys)
3. **(1,9,3): PERIOD → LEFT_BRACKET** - Displaced bracket
4. **(1,10,3): Empty → RIGHT_BRACKET** - Programming pair
5. **(1,11,3): Empty → BACKSLASH** - Programming/paths
6. **(1,12,3): Empty → MINUS** - Displaced from base layer
7. **(1,1,2): Empty → Win+S** - Left launcher
8. **(1,2,2): Empty → Alt+Space** - Left launcher (PowerToys)

### Layer 3 Changes (2 keys)
9. **(3,6,2): Empty → Win+S** - Right launcher
10. **(3,11,3): Empty → Alt+Space** - Right launcher (PowerToys)

### Layer 2 Changes (1 key)
11. **(2,12,2): Empty → Toggle Layer 6** - Scroll toggle

### Layer 6 Setup (1 layer config)
12. **Layer 6: Configure as transparent scroll overlay**

---

## How Norwegian/English Works

### Typing Norwegian
1. Press **Win+Space** to switch Windows to Norwegian keyboard
2. Type normally:
   - `; key` → outputs **Ø**
   - `' key` → outputs **Æ**
   - `\ key` → outputs **Å**
   - `. key` → outputs **.** (same in both!)

### Typing English
1. Press **Win+Space** to switch Windows to English keyboard
2. Type normally:
   - `; key` → outputs **;**
   - `' key` → outputs **'** (apostrophe for can't, don't, etc.)
   - `\ key` → outputs **\\**
   - `. key` → outputs **.** (same in both!)

### Programming (Layer 1)
No matter which keyboard is active, hold Nav thumb to access:
- **[** at position (1,9,3)
- **]** at position (1,10,3)
- **\\** at position (1,11,3)
- **=** at position (1,12,3) (already there)

---

## Usage Examples

### Example 1: Writing Norwegian Email
```
1. Win+Space → Norwegian keyboard
2. Type: "Hei! Jeg bor i Tromsø. Været er fint."
   - Ø appears when you press ; key
   - Period works normally
3. Win+Space → English keyboard (when done)
```

### Example 2: Writing Code
```
1. Windows keyboard = English (default)
2. Type function name with ' apostrophes normally
3. Hold Nav thumb + tap bottom row for brackets:
   function foo() {
       let arr = [1, 2, 3];  // Hold Nav for [ and ]
       return arr;
   }
```

### Example 3: Quick Search (Either Hand)
```
Left hand busy:
- Hold Window thumb (right) + tap H = Win+S search

Right hand busy:
- Hold Nav thumb (left) + tap A = Win+S search
```

### Example 4: Right-Hand Mouse with Scroll
```
1. Hold Window thumb + tap pinky (x10,y2) = mouse mode
2. Move trackball = pointer moves
3. Tap pinky (x12,y2) = scroll mode ON
4. Move trackball = page scrolls
5. Tap pinky again = scroll mode OFF
6. Tap thumb (x7,y4) = exit mouse mode
```

---

## Why This Approach Works

✅ **Norwegian characters accessible** - Via Windows keyboard switch
✅ **English apostrophe accessible** - Same key, different Windows keyboard
✅ **Period on base layer** - Critical for both languages
✅ **Programming symbols on Layer 1** - Clean and organized
✅ **Launchers from both hands** - Ergonomic for split keyboard
✅ **Right-hand mouse mode** - Independent operation
✅ **No firmware rebuild needed** - All done in ZMK Studio

---

## Apply Changes

See [APPLY_V19_CUSTOM_LAYOUT.md](APPLY_V19_CUSTOM_LAYOUT.md) for step-by-step instructions.

**Modified script:** `scripts/zmk-studio/apply_operational_changes.js`

**Total changes:** 11 keys (9 bindings + 1 layer config + updated script)
