# Charybdis Split Keyboard Project

## Hardware

- Charybdis split keyboard (V&Z), 2x Nice!Nano v2 (nRF52840)
- PMW3610 thumb trackball on right half, wireless BLE + USB-C
- 3 monitors, 6720px total horizontal span
- 5 BT profiles: desktop, Windows laptop, future Mac, phone, spare

## Repository Structure

- `zmk-config-charybdis-beacons/` — **THE buildable firmware repo** (pushed to GitHub, has Actions workflow)
- `vendor/vzhao-zmk-for-charybdis-main-20250226/` — seller's ZMK fork with PMW3610 driver (local copy, keep in sync with above)
- `layout/` — layout specs and CSV documentation (616 keys, 11 layers)
- `apps/charybdis-coach/` — browser-based interactive layout coach
- `scripts/zmk-studio/` — ZMK Studio console scripts (apply/verify layout)
- `scripts/windows/` — AHK helper, coach launcher, USB monitor
- `scripts/powershell/` — validation, trackball tuning variants
- `runtime/trackball_benchmarks/` — trackball tuning benchmark system
- `firmware/` — pre-built UF2 files
- `docs/` — project documentation

## Critical Rules

### Firmware Build
- **GitHub Actions ONLY** — no Docker, no local builds. Push to `zmk-config-charybdis-beacons` on GitHub, download UF2 from Actions artifacts.
- Flash only the right half for trackball experiments. Keep previous UF2 as backup.
- Both config repos MUST stay in sync: `zmk-config-charybdis-beacons/config/` and `vendor/vzhao-zmk-for-charybdis-main-20250226/config/`

### PMW3610 Driver Constraints
- **CPI range: [200, 3200]** — values outside this range cause build failure
- **SNIPE_CPI range: [200, 3200]** — same constraint
- CPI 200 is the hardware minimum. Cannot go lower.

### Layout
- Layout is applied via ZMK Studio web UI, NOT firmware flash
- Source of truth: `layout/keybindings_explained.csv` (616 keys)
- Apply: paste `scripts/zmk-studio/apply_every_key.js` into Chrome DevTools at zmk.studio
- Verify: paste `scripts/zmk-studio/verify_every_key.js`

### Trackball Tuning
- One variable change per iteration, benchmark after each
- Benchmark command: `powershell -NoProfile -ExecutionPolicy Bypass -File runtime\trackball_benchmarks\run_benchmark.ps1 -ProfileName <name>`
- Windows mouse settings: sensitivity 20/20, acceleration OFF

## Current Firmware Config

File: `config/boards/shields/charybdis/charybdis_right.conf`

```conf
CONFIG_PMW3610_CPI=200              # sensor minimum; smooth, every count reported
CONFIG_PMW3610_CPI_DIVIDOR=1        # MUST stay 1 — see dead-zone warning below
CONFIG_PMW3610_SNIPE_CPI=1000       # Speed mode (Layer 8)
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_POLLING_RATE_125_SW=y
CONFIG_PMW3610_SMART_ALGORITHM=y
CONFIG_PMW3610_INVERT_X=y
CONFIG_PMW3610_ORIENTATION_90=y
```

Overlay: `scroll-layers = <6>`, `snipe-layers = <8>`.
Keymap: `&zip_xy_scaler 1 1` (was `2 1` — the 2x doubling distorted diagonals/curves). Travel speed = Layer 8 snipe, not the scaler.

### ⚠️ CPI_DIVIDOR dead zone — DO NOT raise CPI to fake a lower number
The sensor minimum is CPI 200 (driver steps in units of 200: `reg = cpi/200`). `CPI_DIVIDOR` is **raw integer division of each poll's delta with NO remainder carry** (`pmw3610.c`: `x = delta / dividor`). At DIVIDOR>1, a slow turn (1..DIVIDOR-1 counts/poll) floors to 0 and is **silently dropped** — the "slow movement = no input" dead zone. The earlier 600/4 "=150" setting caused exactly this. **Keep CPI=200, DIVIDOR=1.** For finer-than-200 precision, scale DOWN with `&zip_xy_scaler <mult> <div>` + `track-remainders` in the keymap — that input processor carries the remainder, so it stays smooth.

## Tuning History

| Profile | CPI | Dividor | Snipe | XY scaler | Result |
|---------|-----|---------|-------|-----------|--------|
| P0 | 600 | 1 | 1600 | 2:1 | FAILURE — 80% miss rate, can't complete paths |
| P1 | 300 | 1 | 1600 | 2:1 | 50-62% hit rate, stage 2/5 paths |
| P2 | 200 | 1 | 400 | 2:1 | ~75% hit rate, stage 2/5 consistent |
| (bad) | 600 | 4 | 1000 | 1:1 | Effective ~150 BUT integer-division dead zone: slow movement dropped. Reverted. |
| Current | 200 | 1 | 1000 | 1:1 | Smooth/responsive (P2 resolution) + scaler 1:1 removes path distortion. |

Next tuning variables if needed: `zip_xy_scaler` with `track-remainders` for smooth sub-200, Smart Algorithm on/off, polling rate 250 vs 125_SW, scroll tick.

## Layer Map & Mode Access

| Layer | Purpose | Firmware Role |
|-------|---------|---------------|
| 0 | Base QWERTY + thumb access (æ/ø/å on NO layout) | — |
| 1 | Navigation, editing, function keys; left-hand Scroll (3,2) + Speed (4,2) | — |
| 2 | Mouse lock and buttons; right-pinky Scroll toggle (12,2) | — |
| 3 | Window/app/desktop; Mouse Lock (10,2), Speed-hold (11,2) | — |
| 4 | Bluetooth, output, system, F13-F24 (F13-15 now spare; æøå moved to base) | — |
| 5 | Reserved (transparent, intentionally unused) | — |
| 6 | Scroll overlay (transparent; firmware scroll layer) | scroll-layers |
| 7 | RPG/game | — |
| 8 | Speed/travel overlay (transparent; exits at 7,4 / 8,4) | snipe-layers (speed mode) |
| 9-10 | Reserved (transparent, intentionally unused) | — |

**Mode access (no single-key-both-hands is physically possible on 36 keys; all use hold-a-layer + tap):**
- **æ/ø/å**: direct on base (11,2=ø · 12,2=æ · 12,1=å) — Norwegian Windows layout renders the SemiColon/Apostrophe/LeftBrace scancodes. ø/æ are coach-relabels (keycode unchanged); å uses the [ scancode (Left Brace) on the P-row slot.
- **Norwegian Windows host model**: ZMK always sends US HID scancodes; Windows Norwegian maps them to glyphs. Coach matches `event.code` (layout-independent) via `layout/windows_norwegian_host.json`. Layer 1 programming keys (`[ ] \ -` on Nav) use US scancodes that Norwegian Windows maps to å/^/etc. — switch to US English (Win+Space or F16) for literal programming punctuation. F13-F15 AHK Norwegian letter injection removed (redundant with base layer).
- **Scroll (Layer 6)**: both hands — right pinky (L2 12,2) and left hand (hold Nav, L1 3,2). Toggle.
- **Speed/travel (Layer 8)**: toggle (not hold) — right: hold Window L3, tap 11,2 Speed, release thumb; left: hold Nav L1, tap 4,2 Speed; mouse-locked: L2 11,3 Speed (no Window hold). Exit: tap Speed again or L8 7,4/8,4 Exit Travel.
- **Mouse (Layer 2)**: left thumb momentary (L0 5,5) and right-hand locked (hold Window L3, tap 10,2).
- **Exit to base (coach beacons required)**: Any key that leaves a locked/toggled overlay must use a coach macro, not plain `To Layer 0`:
  - `coach_base` (F22): L1 5,4 Nav Base · L2 5,4/7,4/8,4 mouse exit · L7 3,4/5,4/7,4/8,4 game exit
  - `coach_travel_off` (Win+F14): L8 7,4/8,4 speed exit
  - `coach_recover_base` (Win+F15): emergency macro in firmware only — not bound to a layout key

## Coach & Helper

- Start coach: `powershell -ExecutionPolicy Bypass -File scripts\windows\start_charybdis_coach.ps1`
- Coach URL: `http://127.0.0.1:8765/apps/charybdis-coach/`
- AHK helper: `scripts/windows/charybdis_helpers.ahk` (launcher, beacon detection, layer state)
- Beacon firmware integration: PENDING (host-side ready, firmware macros not yet wired)

## Stale Content Warning

The `runtime/trackball_benchmarks/archive/` folder contains outdated planning docs from early tuning iterations. Do not treat them as current.
