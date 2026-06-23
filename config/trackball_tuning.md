# PMW3610 Trackball Firmware Tuning

This config repo is now prepared for the first real PMW3610 firmware tuning flash.

## Active Experiment

The current active experiment uses a calm default pointer plus a high-speed Layer 8 travel overlay:

```conf
CONFIG_PMW3610_CPI=600
CONFIG_PMW3610_SNIPE_CPI=1600
```

Everything else is intentionally unchanged:

```conf
CONFIG_PMW3610_CPI_DIVIDOR=1
CONFIG_PMW3610_SNIPE_CPI_DIVIDOR=1
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_ORIENTATION_90=y
CONFIG_PMW3610_INVERT_X=y
CONFIG_PMW3610_POLLING_RATE_125_SW=y
CONFIG_PMW3610_SMART_ALGORITHM=y
# CONFIG_PMW3610_AUTOMOUSE_TIMEOUT_MS=250
```

The overlay keeps Layer 1 scroll and uses Layer 8 as the high-speed travel trigger:

```dts
scroll-layers = <1>;
snipe-layers = <8>;
// automouse-layer = <3>;
```

## Why This First

The current preference is: calm one-screen work by default, with a deliberate high-speed mode for long pointer travel. This keeps normal work controllable without losing a fast way to cross multiple monitors.

The PMW3610 driver calls the alternate CPI path `snipe`, but in this layout `snipe-layers = <8>` is used as pointer travel mode. Layer 8 is mostly transparent in ZMK Studio, so normal keys can fall through while the firmware sees Layer 8 and switches the trackball to `SNIPE_CPI=1600`. Exit travel with Layer 8 `x7 y4` or `x8 y4`.

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

## Escalation Order

Use `scripts/powershell/apply_trackball_tuning_variant.ps1` from the project root for later variants:

1. `default-800-travel-1600` if the calm default feels too slow.
2. `default-600-travel-1200` if travel mode is too aggressive.
3. `default-800-travel-2000` only if monitor travel is still too slow.
4. `smart-off` only after choosing the best CPI.
5. `scroll-90` or `scroll-50` only after pointer motion is settled.
6. `automouse-1500`, then `automouse-1000` or `automouse-2000`, only after pointer motion is good.
7. Input-processor scaling or driver migration only after CPI/layer behavior is understood.

Layer 7 is reserved for the optional RPG/game layer. Layer 8 is now reserved for pointer travel. Future scroll/precision experiments should use Layer 9.

## Rollback

The original seller baseline was:

```conf
CONFIG_PMW3610_CPI=400
CONFIG_PMW3610_SNIPE_CPI=200
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_SMART_ALGORITHM=y
scroll-layers = <1>;
//snipe-layers = <2>;
// automouse-layer = <3>;
```

Use the `baseline-400-200` variant to restore the original CPI pair.
