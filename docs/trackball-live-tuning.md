# Trackball live tuning

The right-side firmware exposes temporary ZMK Studio behaviors for changing the jump-acceleration processor without reflashing between adjustments. Values are volatile and reset to the compiled defaults at reboot.

Assign these behaviors temporarily in ZMK Studio, on a right-half key, then press one step at a time and repeat the same Motion Lab test:

| ZMK Studio behavior | Change |
|---|---|
| Trackball base −0.1x / +0.1x | Low-speed gain, in 0.1x steps |
| Trackball fast −0.1x / +0.1x | High-speed gain, in 0.1x steps |
| Trackball ramp start −100 / +100 | Start of acceleration, sensor counts/second |
| Trackball ramp width −100 / +100 | Speed range over which gain rises |
| Trackball window −4ms / +4ms | Whole-vector velocity history, 8–80 ms |
| Trackball travel window −8ms / +8ms | Independent path-distance history, 24–200 ms |
| Trackball travel start −16 / +16 | Distance counts before acceleration starts |
| Trackball travel ramp −16 / +16 | Additional distance counts to reach full distance eligibility |
| Trackball speed filter −4ms / +4ms | Velocity smoothing, 0–100 ms |
| Trackball gain filter −4ms / +4ms | Gain smoothing, 0–100 ms |
| Trackball reset tuning | Restore compiled defaults |

Each adjustment emits the full active values through ZMK logging. `1000` means `1.0x`; speed thresholds are sensor counts/second. The temporary controls do not alter keymap positions and are not bound in the shipped layout.

The current cursor profile uses the legacy per-event speed estimate with a smootherstep ramp. Its base/fast gain and ramp thresholds are defined in `config/charybdis.keymap`; read that file for the active values. The velocity-window and distance-gate controls are available for experiments but are disabled by default in the current profile. Driver queue overflow and its permanent fix are documented in [`trackball-input-loss.md`](trackball-input-loss.md).

PMW3610 REST2 and REST3 sampling are configured at 40 ms (driver defaults are 100 ms and 500 ms). `force-awake` remains enabled while ZMK is active; the faster rest sampling reduces the first-motion wait after the sensor enters deep rest, with higher sensor activity while resting.

During motion, firmware also emits one `trackball input:` summary per second:

```text
trackball input: samples=... raw_path=... output_path=... max_gap_ms=...
```

Each line also includes the observed speed range, maximum accumulated travel, and gain range. `raw_path` and `samples` describe relative events received by this processor before its acceleration curve; they are not direct PMW3610 register readings. `output_path` measures the processed deltas. `max_gap_ms` measures time between synchronized vectors as handled by ZMK, so it can reveal gaps before the Windows Motion Lab sees them. No per-sample logging is enabled.

## Tuning protocol

1. Set a firmware/profile label in Motion Lab before each run.
2. Keep all values at defaults for one short run first.
3. Change one parameter pair only. Record the label/adjustment and run the same four shapes.
4. Use the reset behavior between experiments; reboot also restores defaults.
5. Compare trace continuity and event-gap timing separately from path error. Red breaks in Motion Lab indicate browser-visible gaps, not a proven sensor drop.
