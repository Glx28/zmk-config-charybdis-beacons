# Layout Guide

The full source of truth is:

- `layout/final_v1_8_operational_full_layout.json`
- `layout/final_v1_8_operational_full_layout.csv`
- `layout/final_v1_8_operational_full_live_verify_expected.csv`
- `layout/keybindings_explained.csv`

The layout contains 616 visible keys: 56 visible coordinates across 11 visible layers.

## Coordinate Model

- Left half: `x0-x5`
- Split gap: `x6`
- Right half: `x7-x12`
- Rows: `y0-y5`
- Main/central half: right side

## Layer Summary

| Layer | Purpose |
|---:|---|
| 0 | Base typing, punctuation, Enter, Space, Backspace, primary click, thumb layer access |
| 1 | Navigation, editing, function keys, shortcuts, and firmware trackball scroll |
| 2 | Mouse buttons and locked mouse workflow |
| 3 | Window/app controls, language helpers, pointer travel toggle, game entry |
| 4 | Bluetooth, output, Studio/system, reset/bootloader, F13-F24 helpers |
| 5 | Reserved transparent layer |
| 6 | Reserved transparent layer |
| 7 | RPG/game layer |
| 8 | Pointer-travel overlay exits |
| 9 | Reserved transparent layer |
| 10 | Reserved transparent layer |

## Daily Anchors

| Action | Key |
|---|---|
| Space | Layer 0 `x4 y4` |
| Enter | Layer 0 `x7 y5` |
| Backspace/Delete position | Layer 0 `x12 y0` |
| Left click / drag hold | Layer 0 `x4 y5` |
| Hold navigation/editing | Layer 0 `x3 y4` |
| Hold mouse layer | Layer 0 `x5 y5` |
| Hold language/system | Layer 0 `x7 y4` |
| Hold window/app layer | Layer 0 `x8 y4` |

## Navigation And Editing

Hold Layer 1 with `x3 y4`.

| Action | Layer 1 key |
|---|---|
| Arrow cluster | `x7 y2`, `x8 y2`, `x9 y2`, `x10 y2` |
| Home / Page Up / Page Down / End | `x8 y1`, `x9 y1`, `x10 y1`, `x11 y1` |
| Copy / Paste / Undo / Save / Cut / Redo | `x7-x12 y3` |
| Find / Replace | `x5 y1`, `x5 y3` |
| Delete previous word | `x5 y2` |
| Trackball scroll | Hold Layer 1 and move the trackball |

Trackball scroll is firmware-level through `scroll-layers = <6>`.

## Mouse Replacement

| Action | How |
|---|---|
| Move pointer | Right-side trackball |
| Left click / drag | Layer 0 `x4 y5` |
| Temporary mouse buttons | Hold Layer 2 with `x5 y5` |
| Locked mouse layer | Hold Layer 3 with `x8 y4`, tap `x10 y2` |
| Exit locked mouse layer | Layer 2 `x7 y4` or `x8 y4` |
| Pointer travel | Hold Layer 3 with `x8 y4`, tap `x11 y2` |
| Exit pointer travel | Layer 8 `x7 y4` or `x8 y4` |

## Window, App, And Language

Layer 3 handles the Windows-style workflow:

- app launcher
- clipboard history
- snipping
- desktop/window movement
- virtual desktops
- taskbar apps
- mouse lock
- pointer travel
- game entry

Layer 4 handles:

- Bluetooth profiles
- output selection
- Studio unlock
- reset and bootloader
- F13-F24 app/helper keys
- language helper keys

## Game Layer

Layer 7 is a locked RPG/game layer.

| Action | How |
|---|---|
| Enter from left hand | Hold Layer 1 with `x3 y4`, tap `x0 y1` |
| Enter from right hand | Hold Layer 3 with `x8 y4`, tap `x12 y2` |
| Exit to Base | Layer 7 `x3 y4`, `x5 y4`, `x7 y4`, or `x8 y4` |

The full per-key game map is in `layout/keybindings_explained.csv`.

## Firmware Boundary

ZMK Studio owns visible keybindings. Firmware owns:

- PMW3610 default CPI
- PMW3610 pointer-travel CPI
- scroll tick
- smart algorithm
- scroll layers
- physical shield and trackball wiring

See `docs/firmware.md`.
