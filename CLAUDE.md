# Charybdis Split Keyboard Project

## Hardware

- Charybdis split keyboard (V&Z), 2x Nice!Nano v2 (nRF52840)
- PMW3610 thumb trackball on right half, wireless BLE + USB-C
- 3 monitors, 6720px total horizontal span
- 5 BT profiles: desktop, Windows laptop, future Mac, phone, spare

## Repository Structure

**THIS repo (root) IS the buildable ZMK config.** Remote: `Glx28/zmk-config-charybdis-beacons` (branch `main`); CI workflow `.github/workflows/build.yml`. Edit + commit + push from the repo ROOT.

- `config/` — **canonical buildable ZMK config** (CI source). Edit `config/boards/shields/charybdis/charybdis_right.conf` + `config/charybdis.keymap` here.
- `layout/` — layout specs and CSV documentation (616 keys, 11 layers); `keybindings_explained.csv` is the source of truth
- `apps/charybdis-coach/` — browser-based interactive layout coach
- `scripts/zmk-studio/` — ZMK Studio console scripts (apply/verify layout)
- `scripts/windows/` — AHK helper, coach launcher, USB monitor
- `scripts/powershell/` — validation, trackball tuning variants
- `runtime/trackball_benchmarks/` — trackball tuning benchmark system
- `firmware/` — pre-built UF2 files (`charybdis_right_trackball.uf2` = latest right-half build)
- `docs/` — project documentation
- **gitignored mirrors (do NOT push, do NOT treat as canonical):** `zmk-config-charybdis-beacons/` (legacy nested clone of this same repo) and `vendor/vzhao-zmk-for-charybdis-main-20250226/` (seller's ZMK fork; holds the local PMW3610 driver source for reference). Keep their `config/` copies mirrored from root `config/` only for local reference.

## Critical Rules

### Firmware Build
- **GitHub Actions ONLY** — no Docker, no local builds. From the repo root: commit + `git push origin main`, then `gh run download <id> -n "firmware-nice_nano_v2-charybdis_right-studio-rpc-usb-uart" -D <dir>`, copy the UF2 to `firmware/charybdis_right_trackball.uf2`.
- Edit configs in root `config/`. The `vendor/` and nested `zmk-config-charybdis-beacons/` copies are gitignored mirrors — sync root→them for local reference, but CI only sees root `config/`.
- Flash only the right half for trackball experiments. Keep previous UF2 as backup (`firmware/*_BACKUP_*.uf2`, gitignored).
- **Flashing:** double-tap reset on the right half → `NICENANO` drive mounts (usually `D:`) → copy the UF2 → drive auto-ejects = success. Verify by behavior (e.g. CPI change), NOT by the `CURRENT.UF2`/`INFO_UF2.TXT` dates (those are the bootloader, never change). The bootloader reports `Model: nice!nano` (v1 label) but `nice_nano_v2` UF2s flash fine.

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
- Windows mouse settings: **pointer speed 1:1 (MouseSensitivity=10), acceleration OFF**. Earlier sessions ran MouseSensitivity=20 (max, ~3.5x amplification) — that amplifies the low-CPI coarseness and hurts precision. At CPI 200, keep Windows at 1:1 and use Layer 8 speed for travel. Tune feel here (instant, no reflash) before touching CPI; nudge to 12-14 if 1:1 feels too slow, never max.

## Current Firmware Config

File: `config/boards/shields/charybdis/charybdis_right.conf`

```conf
CONFIG_PMW3610_CPI=600              # fine counts; halved to 300 effective by keymap scaler
CONFIG_PMW3610_CPI_DIVIDOR=1        # MUST stay 1 — see dead-zone warning below
CONFIG_PMW3610_SNIPE_CPI=3200       # Speed mode (Layer 8); x0.5 scaler = 1600 effective travel
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_POLLING_RATE_125_SW=y
CONFIG_PMW3610_SMART_ALGORITHM=y
CONFIG_PMW3610_INVERT_X=y
CONFIG_PMW3610_ORIENTATION_90=y
```

Overlay: `scroll-layers = <6>`, `snipe-layers = <8>`.
Keymap: `&zip_xy_scaler 1 2` (halve, smooth via track-remainders). **Effective precision = 600 × 0.5 × Windows 1:1 = 300** — matches the old "150 CPI × Windows sens 20 (≈2×)" feel, but smooth (600 fine counts) at Windows 1:1. The scaler also halves snipe, so travel ceiling = SNIPE 3200 × 0.5 = 1600 effective. Windows `MouseSensitivity=10` (1:1). To change overall speed without a reflash, use the Windows slider; to change the precision/travel *ratio*, change CPI vs SNIPE_CPI (both quantized to multiples of 200).

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
| 1 | Navigation, editing, function keys; left-hand Scroll (3,2) + Speed (4,2) + Code toggle (0,1) | — |
| 2 | Mouse lock and buttons; right-pinky Scroll toggle (12,2) | — |
| 3 | Window/app/desktop; Mouse Lock (10,2), Speed-hold (11,2); y0 filled with Win extras | — |
| 4 | Bluetooth, output, system, F13-F24 sequential; DMS toggle (2,3) | — |
| 5 | Code/IDE layer (44 VS Code shortcuts); toggle from L1 0,1 | — |
| 6 | Scroll overlay (transparent; firmware scroll layer) | scroll-layers |
| 7 | RPG/game | — |
| 8 | Speed/travel overlay (transparent; exits at 7,4 / 8,4) | snipe-layers (speed mode) |
| 9 | M-Files/DMS layer (22 document management shortcuts); toggle from L4 2,3 | — |
| 10 | Reserved (transparent, available for future app layer) | — |

**Mode access (no single-key-both-hands is physically possible on 36 keys; all use hold-a-layer + tap):**
- **æ/ø/å**: direct on base (11,2=ø · 12,2=æ · 12,1=å) — Norwegian Windows layout renders the SemiColon/Apostrophe/LeftBrace scancodes. ø/æ are coach-relabels (keycode unchanged); å uses the [ scancode (Left Brace) on the P-row slot.
- **Norwegian Windows host model**: ZMK always sends US HID scancodes; Windows Norwegian maps them to glyphs. Coach matches `event.code` (layout-independent) via `layout/windows_norwegian_host.json`. Layer 1 programming keys (`[ ] \ -` on Nav) use US scancodes that Norwegian Windows maps to å/^/etc. — switch to US English (Win+Space or F16) for literal programming punctuation. F13-F15 AHK Norwegian letter injection removed (redundant with base layer).
- **Scroll (Layer 6)**: right pinky toggle (L2 12,2) for extended scrolling; left hand momentary hold (L1 3,2 or L2 5,0) for quick scroll peeks.
- **Speed/travel (Layer 8)**: toggle (not hold) — right: hold Window L3, tap 11,2 Speed, release thumb; left: hold Nav L1, tap 4,2 Speed; mouse-locked: L2 11,3 Speed (no Window hold). Exit: tap Speed again or L8 7,4/8,4 Exit Travel.
- **Mouse (Layer 2)**: left thumb momentary (L0 5,5) and right-hand locked (hold Window L3, tap 10,2).
- **Code/IDE (Layer 5)**: toggle from L1 0,1 (hold Nav, tap far-left upper). 44 VS Code shortcuts. Exit: coach_base on thumb keys.
- **M-Files/DMS (Layer 9)**: toggle from L4 2,3 (hold System, tap left middle bottom). 22 document management shortcuts. Exit: coach_base on thumb keys.
- **Exit to base (coach beacons required)**: Any key that leaves a locked/toggled overlay must use a coach macro, not plain `To Layer 0`:
  - `coach_base` (F22): L1 5,4 · L2 5,4/7,4/8,4 · L5 3,4/5,4/7,4/8,4 · L7 3,4/5,4/7,4/8,4 · L9 3,4/5,4/7,4/8,4
  - `coach_travel_off` (Win+F14): L8 7,4/8,4 speed exit
  - `coach_recover_base` (Win+F15): emergency macro in firmware only — not bound to a layout key

## Coach & Helper

- Start coach: `powershell -ExecutionPolicy Bypass -File scripts\windows\start_charybdis_coach.ps1`
- Coach URL: `http://127.0.0.1:8765/apps/charybdis-coach/`
- AHK helper: `scripts/windows/charybdis_helpers.ahk` (launcher, beacon detection, layer state)
- Beacon firmware integration: PENDING (host-side ready, firmware macros not yet wired)

## Stale Content Warning

The `runtime/trackball_benchmarks/archive/` folder contains outdated planning docs from early tuning iterations. Do not treat them as current.
