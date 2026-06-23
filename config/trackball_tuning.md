# PMW3610 Trackball Firmware Tuning

## Driver Constraints

- **CPI range: [200, 3200]** — values outside cause build failure
- **SNIPE_CPI range: [200, 3200]** — same constraint
- CPI 200 is the hardware minimum

## Current Config

```conf
CONFIG_PMW3610_CPI=200              # Precision (default) — at hardware minimum
CONFIG_PMW3610_SNIPE_CPI=1000       # Speed mode (Layer 8 "Ptr Travel")
CONFIG_PMW3610_CPI_DIVIDOR=1
CONFIG_PMW3610_SNIPE_CPI_DIVIDOR=1
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_ORIENTATION_90=y
CONFIG_PMW3610_INVERT_X=y
CONFIG_PMW3610_POLLING_RATE_125_SW=y
CONFIG_PMW3610_SMART_ALGORITHM=y
# CONFIG_PMW3610_AUTOMOUSE_TIMEOUT_MS=250
```

Overlay:

```dts
scroll-layers = <6>;
snipe-layers = <8>;
// automouse-layer = <3>;
```

## Tuning History

| Profile | CPI | Snipe CPI | Result |
|---------|-----|-----------|--------|
| Seller baseline | 400 | 200 | Original config |
| P0 | 600 | 1600 | FAILURE — 80% miss rate, can't complete paths |
| P1 | 300 | 1600 | 50-62% hit rate, stage 2/5 paths |
| P2 | 200 | 400 | ~75% hit rate, stage 2/5 consistent |
| Current | 200 | 1000 | CPI at minimum, snipe repurposed as speed mode |

## Design

CPI 200 for precision work (clicking, path following). Layer 8 activates speed mode (CPI 1000) for crossing 3 monitors. Layer 8 is mostly transparent so normal keys fall through while the trackball switches CPI. Exit travel with Layer 8 `x7 y4` or `x8 y4`.

Next tuning variables: XY scaler (2:1 → 1:1), Smart Algorithm on/off, polling rate.

## Build

Firmware is built via GitHub Actions. Push config changes and download the UF2 artifacts from the Actions run.

The build matrix entry for the right half:

```yaml
board: nice_nano_v2
shield: charybdis_right
snippet: studio-rpc-usb-uart
cmake-args: -DCONFIG_ZMK_STUDIO=y
```

## Flash Rule

Flash only the right half for trackball experiments unless the build system or bootloader workflow requires both halves. Keep the previous working UF2 before every flash.

## Test Checklist

After flashing:

```text
[ ] Windows pointer speed middle/default
[ ] Enhance pointer precision OFF for baseline
[ ] tiny 1-2 px pointer movement
[ ] select exactly one character in VS Code
[ ] click small VS Code UI target
[ ] select one Excel cell
[ ] cross all 3 monitors
[ ] drag-select with x4 y5 + trackball
[ ] hold Nav x3 y4 and scroll in Edge, VS Code, Excel, Outlook, Teams, M-Files
[ ] rate tiny movement, speed, precision click, scroll, fatigue from 1-5
```

## Next Experiments (CPI is at floor)

CPI 200 is the hardware minimum. To improve precision further, test one at a time:

1. **XY scaler 1:1** — currently 2:1, may distort curves/diagonals. Most likely next win.
2. **Smart Algorithm OFF** — may improve path following if it's smoothing badly.
3. **Polling rate** — currently 125Hz SW, could try higher.
4. **Scroll tick** — adjust after pointer motion is settled.
5. **Automouse** — only after pointer motion is good.

Layer 7 = RPG/game. Layer 8 = pointer travel/speed mode. Layer 9 = future experiments.

## Rollback

Rollback UF2: `firmware/charybdis_right_trackball_ROLLBACK_CPI400_SNIPE200.uf2`

Original seller baseline (historical — scroll-layers was 1 before being moved to 6):

```conf
CONFIG_PMW3610_CPI=400
CONFIG_PMW3610_SNIPE_CPI=200
scroll-layers = <1>;
```
