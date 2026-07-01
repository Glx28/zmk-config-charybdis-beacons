# Keymap Design Methodology — Charybdis Split Keyboard

A complete guide for any AI agent to understand, analyze, and improve the keyboard layout. No prior knowledge of split keyboards, ZMK, trackballs, or custom keymaps required.

## 1. Physical Hardware Model

### The keyboard
This is a **split keyboard** — two separate halves, one for each hand, connected wirelessly. Each half has keys arranged in a grid.

```
LEFT HALF                           RIGHT HALF
┌──┬──┬──┬──┬──┬──┐               ┌──┬──┬──┬──┬──┬──┐
│x0│x1│x2│x3│x4│x5│  y0 (top)    │x7│x8│x9│10│11│12│  y0
├──┼──┼──┼──┼──┼──┤               ├──┼──┼──┼──┼──┼──┤
│x0│x1│x2│x3│x4│x5│  y1 (upper)  │x7│x8│x9│10│11│12│  y1
├──┼──┼──┼──┼──┼──┤               ├──┼──┼──┼──┼──┼──┤
│x0│x1│x2│x3│x4│x5│  y2 (HOME)   │x7│x8│x9│10│11│12│  y2
├──┼──┼──┼──┼──┼──┤               ├──┼──┼──┼──┼──┼──┤
│x0│x1│x2│x3│x4│x5│  y3 (bottom) │x7│x8│x9│10│11│12│  y3
└──┴──┼──┼──┼──┤                     ├──┼──┼──┴──┘
      │x3│x4│x5│  y4 (thumb)        │x7│x8│        y4
      └──┼──┼──┤                     ├──┤
         │x4│x5│  y5 (thumb2)       │x7│           y5
         └──┴──┘                     └──┘
```

**Key facts:**
- Left columns: x0-x5. Right columns: x7-x12. There is no x6 (physical gap between halves).
- Rows y0-y3 are finger rows. Rows y4-y5 are thumb clusters.
- The right half has a **PMW3610 trackball** under the right thumb — it acts as a mouse.
- x0 column (left far pinky) holds modifiers: Esc, Tab, Shift, Ctrl on Layer 0.

### Row ergonomics (critical concept)
Rows are NOT equally comfortable. This is the single most important layout principle:

| Row | Name | Comfort | Why |
|-----|------|---------|-----|
| y2 | HOME ROW | Best (1) | Fingers rest here naturally. Zero movement. |
| y1 | Upper | Good (2) | Small upward curl. Low effort. |
| y3 | Bottom | Good (2) | Small downward curl. Same effort as y1. |
| y0 | Top | Reach (3) | Full finger extension. Requires effort. |
| y4-y5 | Thumb | Special (4-5) | Thumb-only. Can't use while thumb holds a layer. |

**Rule: Put the most-used keys on y2, second-most on y1/y3, least-used on y0.**

### Column ergonomics
Columns also have effort cost based on distance from home position:

| Finger | Home column (left/right) | Effort 0 |
|--------|-------------------------|----------|
| Index | x4 / x8 | 0 (home) |
| Middle | x3 / x9 | 1 |
| Ring | x2 / x10 | 2 |
| Pinky | x1 / x11 | 3 |
| Far pinky | x0 / x12 | 4 (worst) |
| Index stretch | x5 / x7 | 1 (inward stretch) |

Total effort for any key = row_comfort + column_effort. Lower is better.

## 2. Layer System

The keyboard has 11 layers (0-10). Only one layer is "active" at a time (plus transparent fall-through). Layers are like pages — each key position can do something different on each layer.

### How layers activate

| Method | How it works | When to use |
|--------|-------------|-------------|
| **Momentary (hold)** | Hold a thumb key → layer active. Release → back to previous. | Most layers. Quick access. |
| **Toggle** | Tap once → layer stays on. Tap again → off. | Scroll, speed modes. |
| **Lock (coach beacon)** | Special macro that locks a layer until explicitly exited. | Mouse lock, game lock. |
| **Transparent** | A key with no binding on current layer → falls through to the layer below. | Modifiers, unused positions. |

### Layer access map

> **Dynamic layer rule:** Only L0 and L7 have stable semantic roles. L0 is base typing/thumb access. L7 is frozen fallback/game/system-safe space. Every other layer gets its role from the generated layout and usage data for that generation. Numbered behaviors such as `coach_l2_hold` are access beacons, not semantic labels.

```
Layer 0 (Base) ─── always active, QWERTY + Norwegian letters
  ├─ THUMB ACCESS ──→ numbered target layer chosen by generated layout
  ├─ THUMB ACCESS ──→ numbered target layer chosen by generated layout
  ├─ THUMB ACCESS ──→ numbered target layer chosen by generated layout
  └─ THUMB ACCESS ──→ numbered target layer chosen by generated layout

Generated layers may include mode switches:
  ├─ LOCK/TOGGLE ──→ target layer chosen by generated layout
  ├─ MOMENTARY ────→ target layer chosen by generated layout
  └─ Layer 7 lock remains the frozen fallback/game/system-safe exception
```

**Dynamic assignment:** The v2 optimizer does not enforce fixed meanings for L1-L6 or L8-L10. It places mouse buttons, scroll-mode access, app shortcuts, symbols, completion keys, and workflow groups wherever the current objective finds the best effort/usage tradeoff. Always check the evolved `keybindings_explained.csv` to see where actions actually landed.

### The thumb-hold constraint (CRITICAL)

When a thumb holds a layer key, **that thumb is busy**. This has cascading effects:

1. **The holding hand's other thumb keys are unreachable** — you can't press two thumb keys on the same hand.
2. **The holding hand's finger keys (y0-y3) ARE reachable** — fingers still work normally.
3. **The other hand is completely free** — all keys reachable.

**Example:** Left thumb holds a momentary layer. Left hand fingers can press shortcuts on that layer. But left thumb can't also press Space (x4,y4) or Alt (x5,y4) — those are other thumb keys on the same hand.

In evolved layouts, the optimizer may assign mouse buttons to any layer — the same thumb-hold constraint applies regardless of the target layer number.

This is why mouse buttons often need reachable finger-row access when their access path uses a thumb hold. When a thumb holds a momentary layer, same-hand thumb keys are busy, but fingers can still click.

### Momentary vs Toggle vs Lock — when each makes sense

| Use case | Correct behavior | Why |
|----------|-----------------|-----|
| Arrows, F-keys (Nav layer) | **Momentary hold** | Quick: hold Nav, tap arrow, release. Sub-second. |
| Mouse-heavy browsing | **Lock or toggle when needed** | You need both hands free for extended mouse use. Momentary can trap a thumb. |
| Scroll (quick peek) | **Momentary hold** | Hold pinky to scroll, release to stop. Brief. |
| Scroll (extended reading) | **Toggle** | Tap to enter scroll mode, read, tap to exit. Hands-free. |
| Speed/travel across monitors | **Toggle** | Toggle on, move fast, toggle off. Thumb must be on trackball. |
| Game layer | **Lock** | Gaming needs all keys free for extended periods. |

**The general rule:** If the action takes < 1 second, use momentary. If > 1 second, use toggle/lock.

## 3. How to Audit a Layer

### Step 1: Map the physical layout
For each layer, create a grid showing what every key does. This example is historical only; evolved layouts may place mouse buttons on any non-L0/non-L7 layer:

```
Example dynamic layer — LEFT HAND:
┌─────────┬──────────┬─────────┬──────────┬──────────┬────────┐
│Trans(Esc)│Task View │Desktop  │Next Tab  │Prev Tab  │Scroll  │ y0
├─────────┼──────────┼─────────┼──────────┼──────────┼────────┤
│Trans(Tab)│Alt+Tab   │Esc      │Enter     │BkSp      │Close   │ y1
├─────────┼──────────┼─────────┼──────────┼──────────┼────────┤
│Trans(Shf)│MB1      │MB2      │MB3       │MB4       │MB5     │ y2
├─────────┼──────────┼─────────┼──────────┼──────────┼────────┤
│Trans(Ctl)│Undo     │Cut      │Copy      │Paste     │Sel All │ y3
└─────────┴──────────┴─────────┴──────────┴──────────┴────────┘
  x0         x1        x2        x3         x4         x5
```

### Step 2: Check row priority
Count how often each key would be used in a real workflow, then verify:
- y2 has the **most-used** keys (mouse buttons, arrows, etc.)
- y1 has **second-most** (Enter, Esc, BkSp — used often but not every action)
- y3 has **third** (clipboard — used in bursts, not constantly)
- y0 has **least-used** (window management — occasional, not every minute)

### Step 3: Check thumb-hold conflicts
For each layer accessed by thumb hold:
1. Which thumb is busy? (left or right)
2. Can the same-hand fingers still reach the important keys? (y0-y3 should all work)
3. Are there any keys on the same-hand thumb row that would be useful but unreachable?
4. Are there momentary keys on the layer that need the SAME hand's thumb? (conflict!)

### Step 4: Check for duplicates and wasted keys
- Same binding on two positions where one would suffice = wasted key
- Transparent keys in reachable positions on populated layers = opportunity
- Same shortcut duplicated across layers where it's not needed from both access paths

### Step 5: Check modifier fall-through
x0 column may be Transparent on overlay layers. This means:
- L0 x0,y0 (Esc) falls through → Esc available on all layers
- L0 x0,y1 (Tab) falls through → Tab available on all layers
- L0 x0,y2 (Shift) falls through → Shift-modified actions remain possible
- L0 x0,y3 (Ctrl) falls through → Ctrl-modified actions remain possible

**Never put active bindings on x0 for overlay layers** — the modifier fall-through is more valuable.

## 4. Workflow Simulation

### What it is
Walk through a real task step-by-step, recording every key press, which layer it's on, which hand does what, and whether any step is physically impossible or awkward.

### How to simulate

```
Workflow: "Copy text from browser, paste into document"

Step 1: Enter mouse mode
  → Left thumb holds L0 x5,y5 (coach_l2_hold)
  → Left thumb: BUSY. Right hand: FREE (trackball).
  
Step 2: Click to position cursor
  → Left index presses L2 x1,y2 (MB1) — HOME ROW, effort=4 ✓
  
Step 3: Drag to select text
  → Hold MB1 + move trackball with right thumb
  → Both work simultaneously ✓
  
Step 4: Copy
  → Left middle presses L2 x3,y3 (Ctrl+C) — BOTTOM ROW, effort=3 ✓
  
Step 5: Alt+Tab to switch apps
  → Left index presses L2 x1,y1 (Alt+Tab) — UPPER ROW, effort=5 ✓
  → No need to release the generated mouse-action layer!
  
Step 6: Click paste location
  → Left index presses L2 x1,y2 (MB1) again ✓
  
Step 7: Paste
  → Left ring presses L2 x4,y3 (Ctrl+V) — effort=7 (ring+bottom)
  → Works but higher effort. Consider: is there a better position?
```

### What to look for in simulations
1. **Step impossible?** (two thumbs needed on same hand)
2. **Layer switch mid-workflow?** (release L2, switch to L1, switch back — friction)
3. **High effort on frequent steps?** (effort > 5 for something done every 10 seconds)
4. **Missing action?** (need Tab but it's not on the layer — must exit to base and re-enter)

## 5. The Ergonomic Simulator Script

The project includes `scripts/simulate_ergonomics.js` — a Node.js script that automates the audit:

```bash
node scripts/simulate_ergonomics.js
```

### What it checks
1. **Per-layer audit** — row placement, thumb conflicts, content verification
2. **Cross-layer analysis** — exit paths, duplicate shortcuts, shortcut efficiency
3. **Workflow simulations** — step-by-step effort scoring for real tasks
4. **Final report** — issues, warnings, notes, pass count

### How to extend it
Add new workflow simulations by adding `sim()` calls:

```javascript
sim("Your workflow name", [
  { desc: "Step description", l: 0, x: 5, y: 5 },  // layer, x, y
  { desc: "Next step", l: 2, x: 1, y: 2 },
  // conflict field for known issues:
  { desc: "Problem step", l: 2, x: 5, y: 0, conflict: "pinky stretch while thumb holds" },
]);
```

### How to add layer content checks
Add checks to the per-layer section matching the layer number:

```javascript
if (L === "2") {
  const checks = [
    ["Description", active.some(r => r.visual_label === "SomeKey")],
    // ...
  ];
}
```

## 6. Files That Define the Layout

| File | Role | Format |
|------|------|--------|
| `layout/keybindings_explained.csv` | **Source of truth.** Every key on every layer. | CSV: layer, x, y, label, behavior, parameter, modifiers, purpose, notes |
| `scripts/zmk-studio/apply_every_key.js` | Applies layout to keyboard via ZMK Studio console. | JSON array of key entries inside a JS wrapper |
| `apps/charybdis-coach/workflows/*.json` | Per-app shortcut guides with Charybdis mappings. | JSON: categories → shortcuts with `charybdis` field |

**When changing the layout, update ALL THREE:**
1. Edit `keybindings_explained.csv` (source of truth)
2. Edit the matching entry in `apply_every_key.js` (for Studio application)
3. Update any `workflows/*.json` that reference the changed key positions

The coach app (`apps/charybdis-coach/app.js`) reads the CSV at runtime — no code changes needed for layout updates. Just refresh the browser.

## 7. Key Behavior Types

| Behavior | What it does | Studio name |
|----------|-------------|-------------|
| Key Press | Sends a keyboard scancode + optional modifiers | Key Press |
| Mouse Key Press | Sends a mouse button (MB1-MB5) | Mouse Key Press |
| Momentary Layer | Activates layer while held, deactivates on release | Momentary Layer |
| Toggle Layer | Tap to activate, tap again to deactivate | Toggle Layer |
| Transparent | No binding — falls through to the layer below | Transparent |
| None | Explicitly does nothing (blocks fall-through) | None |
| coach_* | Custom ZMK macros for layer management with BLE beacons | Named behaviors in firmware |

### Coach behaviors explained
These are custom ZMK macros (defined in firmware) that combine layer switching with BLE beacon signals so the coach app can track which layer is active:

- `coach_l1_hold` through `coach_l4_hold` — momentary layer holds with beacon signals
- `coach_mouse_lock` — locks its configured target layer (stays until `coach_base` is pressed); the target layer role is dynamic
- `coach_game_lock` — locks Layer 7
- `coach_travel_toggle` — toggles its configured target layer; the target layer role is dynamic
- `coach_base` — returns to Layer 0 and clears all locks/toggles
- `coach_travel_off` — exits the configured toggled layer

## 8. Common Mistakes to Avoid

### Not having mouse buttons on both thumbs AND finger rows
**Wrong:** MB1 only on thumb y4/y5 with no MB1 on finger rows.
**Why:** When a thumb holds a generated mouse-action layer, same-hand thumb keys are unreachable. You may need MB1/MB2 on finger rows so you can click while holding the layer. MB1/MB2 on thumb keys can still be correct for locked/toggled access and base-layer use.
**Right:** Put MB1-MB5 where the generated access path makes them reachable. If the mouse-action cluster is reached by a thumb hold, finger-row copies may be needed; if it is locked/toggled, thumb positions can also be useful.

### Using Toggle when Momentary is better (or vice versa)
**Wrong:** Toggle Layer for Nav (arrows). User must tap to enter, tap to exit, for every arrow key use.
**Right:** Momentary hold. Hold Nav, tap arrows, release. One fluid motion.

**Wrong:** Momentary hold for long mouse-heavy work. User's thumb is trapped the entire time.
**Right:** Lock or toggle the relevant generated layer when both hands need to be free, then exit when done.

### Redundant explicit bindings where transparent works
**Wrong:** Putting Shift explicitly on an overlay key when the transparent fall-through already provides Shift from L0.
**Why:** If the behavior is identical to L0's key, you've wasted a position and lost the fall-through benefit. If you change L0's key later, L2 won't inherit the change.
**Right:** Use transparent when you want the base layer's key to fall through. But x0 and x12 columns are NOT required to be transparent — they're valid positions for active bindings when you need them. Any transparent strategy must be judged against the current generated layer, not a fixed layer role.

### Duplicate bindings without purpose
**Wrong:** Win+Tab on both L3 x8,y2 AND L3 x10,y3.
**Right:** Keep one, replace the duplicate with something useful (Win+E, Win+L, etc.).

**Exception:** Some duplicates ARE intentional when usage logs show they serve different access paths or workflows. Judge duplicates from workflow support and current layer access, not from fixed layer names.

### Putting dangerous keys on home row
**Wrong:** Reset or Bootloader on y2 (home row) — easy to hit accidentally.
**Right:** Put them on y0 at x11-x12 (far corner, top row) — requires deliberate reach.

## 9. Design Checklist for New Layers

When populating a new layer or reviewing an existing one:

- [ ] **y2 (home) has the most-used keys for this layer's purpose**
- [ ] **y1/y3 have second-tier keys**
- [ ] **y0 has least-used keys or mode switches**
- [ ] **Consider transparent fall-through** where base-layer keys are useful (e.g. modifiers)
- [ ] **No duplicate bindings** between positions (unless intentionally mirrored for both-hand access)
- [ ] **Thumb-hold hand's finger keys are all useful and reachable**
- [ ] **Layer has at least 2 exit paths** (if it's a locked/toggled layer)
- [ ] **Workflow simulation passes** with no impossible steps
- [ ] **Both CSV and apply script are updated** together
- [ ] **Workflow guide JSONs updated** if Charybdis mappings changed

## 10. Quick Reference: Current Layer Summary

| Layer | Access | Hold hand | y2 (home) purpose | y1 purpose | y3 purpose | y0 purpose |
|-------|--------|-----------|-------------------|------------|------------|------------|
| 0 | Always | — | Letters (ASDFG/HJKL) | Letters (QWERT/YUIOP) | Letters (ZXCVB/NM,.) | Numbers + Esc |
| 1 | L thumb hold | Left | Arrows + Scroll/Speed | Home/End/PgUp/PgDn | Clipboard + brackets | F1-F12 |
| 2 | L thumb hold or lock | Left | Mouse buttons MB1-5 | Enter/Esc/BkSp/Alt+Tab | Clipboard ops | Window mgmt + tabs |
| 3 | R thumb hold | Right | Taskbar Win+1-5 + modes | Screenshot/Clipboard/Desktop | Win+snap arrows | Transparent (base numbers) |
| 4 | R thumb hold | Right | F19-F23 macros | F13-F18 macros | F24 + free slots | BT profiles + system |
| 7 | Locked | — | Arrow cluster + Z | PgUp/PgDn + arrows | X/C/Shift/Esc | Transparent (base) |
| 8 | Toggled | — | Transparent (all) | Transparent | Transparent | Transparent |
