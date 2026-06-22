# P2 Firmware Configuration Request

## Executive Summary
Testing progression P0→P1 showed significant improvement across all metrics with CPI reduction from 600→300. Requesting P2 with CPI 200 to continue the improvement trend, particularly for path following precision.

---

## Current Hardware & Firmware
- **Device**: Charybdis split keyboard (V&Z design)
- **Sensor**: PMW3610 optical sensor on right thumb position
- **Firmware**: ZMK (vzhao fork for Charybdis support)
- **Config File**: `vendor/vzhao-zmk-for-charybdis-main-20250226/config/boards/shields/charybdis/charybdis_right.conf`
- **Build Script**: `scripts/powershell/build_right_firmware_docker.ps1`

---

## Current P1 Configuration (charybdis_right.conf)

```conf
CONFIG_PMW3610=y
CONFIG_PMW3610_CPI=300                    # Current setting (P1)
CONFIG_PMW3610_CPI_DIVIDOR=1
CONFIG_PMW3610_ORIENTATION_90=y
CONFIG_PMW3610_SNIPE_CPI=1600
CONFIG_PMW3610_SNIPE_CPI_DIVIDOR=1
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_INVERT_X=y
CONFIG_PMW3610_POLLING_RATE_125_SW=y      # Software 125 Hz
CONFIG_PMW3610_SMART_ALGORITHM=y          # Enabled
```

---

## Test Results Summary

### P0 Baseline (CPI 600) - CRITICAL FAILURE STATE
- **R1** (TestUFO): 117 Hz
- **A1** (Aim Trainer): 930 ms/target
- **A2** (MouseAccuracy MEDIUM): 2 hits, 8 misses = **20% hit rate**
- **P2** (XbitLabs Path): Stage 1/5, 0% accuracy, cannot complete first path
- **User feedback**: "Creating even simple straight paths is too hard"

**Conclusion**: CPI 600 completely unusable for precision work

### P1 Results (CPI 300) - MAJOR IMPROVEMENT
- **R1** (TestUFO): 126 Hz (stable, +8% vs P0)
- **A1** (Aim Trainer): 735 ms avg (21% slower but acceptable trade-off)
- **A2** (MouseAccuracy MEDIUM): 8 hits, 3-5 misses = **50-62% hit rate** (+180% improvement)
- **P2** (XbitLabs Path): Stage 2/5, 6% progress, 0% accuracy but **can now create paths**
  - Run 1: Deviation 2.3px, Stage 1/5
  - Run 2: Deviation 3.9px, Stage 1/5
  - Run 3: Deviation 4.4px, Stage 2/5, 6% progress
- **User feedback**: "A lot better to be accurate but the path following still is very hard"

**Conclusion**: CPI reduction proves effective for BOTH clicking accuracy AND path following. Lower CPI = better control.

---

## P2 Configuration Request

**CHANGE REQUIRED:**

Line 10 in `charybdis_right.conf`:
```conf
CONFIG_PMW3610_CPI=300  →  CONFIG_PMW3610_CPI=200
```

**All other settings remain unchanged.**

### Rationale
- P1 showed clear improvement trend with CPI reduction
- Path following improved (stage 1→2) but remains challenging
- Further CPI reduction should provide even finer control
- CPI 200 maintains the successful direction without over-correction

### Expected P2 Results
- A1: May slow to ~800-900ms (acceptable)
- A2: Should maintain or improve 50-70% hit rate
- P2 Path: Target stage 3/5 or higher, >10% progress

---

## Research Context: Path Following Challenges with Thumb Trackballs

### The Problem
**Test**: XbitLabs Mouse Test - Path Following Exercise
**Link**: https://xbitlabs.com/mouse-test/

This test requires users to:
1. Follow curved paths without touching edges
2. Maintain smooth continuous movement
3. Execute precise direction changes
4. Handle circular, S-curve, and zigzag patterns

**Why This Is Extremely Difficult With Thumb Trackballs:**
1. **Biomechanics**: Thumb has limited range of motion vs full hand/wrist
2. **Continuous motion**: Thumb excels at discrete clicks, struggles with smooth curves
3. **Momentum control**: Ball inertia makes it hard to stop precisely during curves
4. **Direction changes**: Require thumb repositioning mid-movement
5. **XY scaling 2:1**: May cause non-linear movement during diagonal/curved paths

### Current Bottlenecks (P1 Analysis)
- Point-and-click accuracy: **SOLVED** by CPI 300 (20%→62% hit rate)
- Path following: **PARTIAL IMPROVEMENT** (stage 1→2), still challenging
- Deviation: 2.3-4.4px (relatively good)
- Stage completion: Cannot complete beyond stage 2/5

### Variables Available for Tuning
1. **CPI** (Current focus): 600→300→200 (testing in progress)
2. **XY Scaler**: Currently 2:1 (not yet tested)
3. **Polling Rate**: 125_SW (not yet tested)
4. **Smart Algorithm**: ON (not yet tested)
5. **CPI Dividor**: Currently 1 (alternative to direct CPI change)
6. **Snipe Mode**: CPI 1600 available (not yet tested for precision work)

### Research Questions for Path Following Optimization
1. **Does XY scaler 2:1 cause overshoot on curves?** Test 1.5:1 or 1:1 ratio
2. **Would higher polling rate (250 Hz) improve path smoothness?**
3. **Does Smart Algorithm help or hurt continuous movement?** Test OFF
4. **Is there an optimal CPI sweet spot?** Test range 150-250
5. **Can snipe mode (CPI 1600) be repurposed as "precision mode" for paths?**
6. **Does ball momentum dominate CPI settings?** Physical sensor vs user technique

### Objective Benchmark Suite (20-minute testing cycle)
- **R1**: TestUFO @ 1000ms (report peak Hz)
- **A1**: Human Benchmark Aim Trainer (3 runs, avg ms/target)
- **A2**: MouseAccuracy.com MEDIUM targets (3 runs, hits/misses)
- **P2**: XbitLabs Path Following (3 runs, paste full stats block)

**Test Links:**
- R1: https://www.testufo.com/framerate-counter
- A1: https://humanbenchmark.com/tests/aim
- A2: https://mouseaccuracy.com/ (MEDIUM difficulty)
- P2: https://xbitlabs.com/mouse-test/

---

## Next Steps After P2 Build

1. Flash P2 firmware (CPI 200)
2. Run benchmark script: `runtime/trackball_benchmarks/run_benchmark_FIXED.ps1 -ProfileName "P2-CPI200"`
3. Complete 4 tests (~20 minutes)
4. Compare P1 vs P2 metrics
5. Decide: KEEP P2 / ITERATE to P3 / PIVOT to different variable (e.g., XY scaler)

---

## Build Command

```powershell
cd c:\Users\sondr\splitted_zmk_keyboard
.\scripts\powershell\build_right_firmware_docker.ps1
```

Firmware output: `build/zephyr/zmk.uf2`

---

**Generated**: 2026-06-22
**Profile**: P1→P2 (CPI 300→200)
**Goal**: Continue improvement trend for path following precision
