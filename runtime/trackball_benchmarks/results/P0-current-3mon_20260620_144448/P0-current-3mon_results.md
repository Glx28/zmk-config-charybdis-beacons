# Trackball Profile Benchmark Results

## Profile Information

**Profile:** P0-current
**Firmware variant:**
**Test date:**
**Session folder:**

## Configuration

### Windows Settings
**MouseSensitivity:**
**SPI_GETMOUSESPEED:**
**Windows accel tuple:**

### Firmware Settings
**CPI:**
**Snipe CPI:**
**XY scaler:**
**Scroll scaler:**
**Scroll tick:**
**Polling:**
**Smart:**
**AutoMouse:**

### Running Software
**PowerToys MouseWithoutBorders:**
**AutoHotkey:**
**Other pointing devices:**

---

## R1 — Raw Report-Rate Stability
**Tool:** WindowsMouseRateChecker

### Slow circles (10 s)
- Average Hz:
- Median interval:
- p95 interval:
- p99 interval:
- Max interval:
- Stalls >20 ms:
- Stalls >40 ms:

### Fast circles (10 s)
- Average Hz:
- Median interval:
- p95 interval:
- p99 interval:
- Max interval:
- Stalls >20 ms:
- Stalls >40 ms:

### Horizontal sweeps (10 s)
- Average Hz:
- Median interval:
- p95 interval:
- p99 interval:
- Max interval:
- Stalls >20 ms:
- Stalls >40 ms:

**Notes:**

---

## R2 — Motion Consistency
**Tool:** MouseTester

### Horizontal movement (slow)
- Plot notes:
- Interval spikes:
- Flat spots:

### Diagonal movement (slow)
- Plot notes:
- Interval spikes:
- Flat spots:

### Fast circles
- Plot notes:
- Interval spikes:
- Uneven X/Y:

**Screenshot path:**
**General notes:**

---

## R3 — Browser Polling Sanity
**Tool:** TestUFO Mouse Rate

### Fast circles (10 s)
- Typical Hz:
- Peak Hz:
- Jitter notes:

### Horizontal sweeps (10 s)
- Typical Hz:
- Peak Hz:
- Jitter notes:

**Browser:**
**Monitor used:**
**General notes:**

---

## A1 — Small-Target Aim
**Tool:** Human Benchmark Aim Trainer

- Run 1 average ms/target:
- Run 2 average ms/target:
- Run 3 average ms/target:
- **Median:**
- **Best:**
- **Worst:**
- Misclick notes:

---

## A2 — Tiny-Target Accuracy
**Tool:** MouseAccuracy (30 s, smallest targets)

### Run 1
- Hits:
- Misses:
- Accuracy:
- Score:

### Run 2
- Hits:
- Misses:
- Accuracy:
- Score:

### Run 3
- Hits:
- Misses:
- Accuracy:
- Score:

**Notes:**

---

## P1 — Path/Drag Precision
**Tool:** XBitLabs mouse accuracy/path tests

### Path following
- Score:
- Deviation:
- Out-of-bounds:

### Shape tracing
- Score:
- Deviation:
- Out-of-bounds:

### Precision clicking
- Score:
- Failures:

### Steady hand/corridor
- Score:
- Failures:
- Out-of-bounds:

**Screenshot path:**
**Notes:**

---

## S1 — Scroll Granularity

### Tiny thumb scrolls (10 scrolls)
- Controllability:
- Notes:

### Medium thumb scrolls (10 scrolls)
- Distance:
- Notes:

### Fast thumb scrolls (10 scrolls)
- Behavior:
- Notes:

**Overscroll count:**
**Reverse-scroll correction count:**
**General notes:**

---

## O1 — Browser Office Task

### Task components
- Open 10 tabs: ⬜
- Close all 10 using tiny close buttons: ⬜
- Select 10-20 characters from paragraph: ⬜
- Drag tab left/right and drop: ⬜
- Click 3 small UI controls: ⬜

### Metrics
- Time:
- Misclicks:
- Overshoots:
- Correction movements:
- Accidental drags:

**Notes:**

---

## O2 — VS Code / IDE Task

### Task components
- Place caret at 10 exact positions: ⬜
- Select 5 short text spans: ⬜
- Click gutter/breakpoint column 5 times: ⬜
- Drag scrollbar/minimap to target: ⬜
- Resize panel/split once: ⬜

### Metrics
- Time:
- Misclicks:
- Failed selections:
- Overshoots:
- Correction movements:

**Notes:**

---

## O3 — Terminal Task

### Task components
- Select one command from history/output: ⬜
- Select one path-like string: ⬜
- Click close/minimize/split/tab UI: ⬜
- Resize terminal pane: ⬜

### Metrics
- Selection failures:
- Overshoots:
- Correction movements:

**Notes:**

---

## O4 — RDP/VM Task
*(Only run for promising profiles)*

### Task components
- 5 browser tiny close-button clicks: ⬜
- 3 text selections: ⬜
- 10 small target clicks: ⬜

### Metrics
- Same/worse/much worse than local:
- Pointer lag:
- Overshoot:
- Misses:

**Notes:**

---

## F1 — Fatigue Block
*(Only run for promising profiles)*

**Duration:** 20 minutes of real work

- Thumb fatigue (0-10):
- Wrist/hand discomfort (0-10):
- Urge to switch device (0-10):
- Pain or strain notes:

---

## Scoring Summary

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Tiny-target accuracy | 30% | | |
| Fitts/target acquisition speed | 20% | | |
| Path/drag precision | 20% | | |
| Report stability | 10% | | |
| Three-monitor travel | 10% | | |
| Scroll control | 7% | | |
| Fatigue | 3% | | |
| **TOTAL** | **100%** | | |

---

## Hard Fail Checks

- [ ] Improved travel but increased tiny-target misses?
- [ ] More frequent >40 ms stalls than baseline without dramatic accuracy improvement?
- [ ] Works locally but bad in RDP/VM?
- [ ] Significantly increased fatigue?

---

## Overall Assessment

**Recommendation:**
**Best use case:**
**Compared to baseline:**
**Next tuning direction:**

**General notes:**
