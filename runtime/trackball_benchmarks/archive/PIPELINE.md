# Profile Iteration Pipeline

## Pipeline Structure

```
P0 (baseline) → Analysis → P1 (hypothesis) → Compare → Decision
                                                          ↓
                                                    Keep/Iterate/Pivot
                                                          ↓
                                              P2 → Compare → Decision → ...
```

## Profile Lifecycle

### Phase 1: Benchmark
1. Create session
2. Run all tests (R1, R2, R3, A1, A2, P1, S1, O1, O2, O3)
3. Collect objective data
4. Save screenshots
5. Log all results

### Phase 2: Analysis
1. Review objective scores
2. Identify pain points
3. Compare to previous profile (if exists)
4. Generate comparison report

### Phase 3: Hypothesis
1. Identify ONE variable to change
2. Predict expected outcome
3. Document reasoning
4. Create new profile

### Phase 4: Decision
1. Review comparison data
2. Decide: KEEP / ITERATE / PIVOT
   - **KEEP**: Profile is good enough, stop iterating
   - **ITERATE**: Small refinement needed, continue same direction (P1→P2)
   - **PIVOT**: Wrong direction, try different approach (P1→P2-alt)

---

## Current Status

### P0-current-3mon (Baseline) - INCOMPLETE

**Completed:**
- ✅ Session created with 3-monitor config
- ✅ Quick validation done
- ✅ Partial test results:
  - R3: 115 Hz (TestUFO)
  - A1: 950ms, 932ms, 1263ms (aim trainer)
  - A2: 100, 125, 112 (MouseAccuracy)

**User Feedback:**
- "Very hard to be accurate"
- "Overshooting"
- "Unable to make a clean path"
- High-level CS:GO player = exceptional baseline for comparison

**Missing for P0 baseline:**
- ❌ R1 - MouseTester report-rate data (Hz, intervals, stalls)
- ❌ R2 - MouseTester motion consistency screenshot
- ❌ P1 - Precision test (Sequence/Chimp numeric scores)
- ❌ S1 - Scroll test (overscroll count)
- ❌ O1 - Browser task (time, misclick count)
- ❌ O2 - VS Code task (time, misclick count)
- ❌ O3 - Terminal task (failure count)

---

## P0 Completion Plan (Exception for P0→P1 Transition)

Since P0 is half-complete, we'll streamline the remaining gaps:

### Critical for P1 Comparison (Must Complete)
1. **A1 full baseline** - Need all 3 runs properly logged (you have: 950, 932, 1263)
2. **A2 full baseline** - Need all 3 runs properly logged (you have: 100, 125, 112)
3. **R2 screenshot** - Need motion consistency baseline graph
4. **S1 overscroll count** - Quick 5-minute scroll test

### Nice-to-Have (Can Skip for P0→P1)
- R1 detailed interval analysis (R3 TestUFO 115 Hz is sufficient)
- P1 precision test (A1+A2 cover accuracy well)
- O1/O2/O3 office tasks (time-consuming, not critical for CPI tuning)

### P0 Completion Checklist

**Do this NOW to complete P0:**

```powershell
# 1. Log your quick validation results properly
.\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "A1" -Run1 950 -Run2 932 -Run3 1263
.\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "A2" -Run1 100 -Run2 125 -Run3 112
.\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "R3" -Hz 115

# 2. MouseTester R2 - Take screenshot (5 min)
.\tools\MouseTester.exe
# Move slow horizontal, screenshot graph, save to screenshots\P0-R2.png

# 3. Scroll test S1 (5 min)
# Open Wikipedia article, do 10 tiny/medium/fast scrolls, count overscrolls
.\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "S1" -Overscrolls [count]
```

**Total time: 15 minutes**

---

## P1 Hypothesis (Ready After P0 Complete)

### Analysis from P0 Quick Validation

**Problem:** Accuracy and overshoot issues
**User:** High-level CS:GO player (top-tier mouse accuracy baseline)
**Current:** CPI 600, XY scaler 2:1

### Hypothesis for P1

**Target:** Improve tiny-target accuracy and reduce overshoot

**Approach 1: Lower CPI**
- Change: CPI 600 → 400
- Scaler: Keep 2:1
- Prediction: Better accuracy, same travel speed, reduced overshoot
- Test: A2 score should increase, A1 ms/target may increase slightly

**Approach 2: Remove scaler**
- Change: Keep CPI 600, remove XY scaler (1:1)
- Prediction: Better control, slower travel, better accuracy
- Test: A2 score should increase, three-monitor travel may feel slow

**Recommended:** Start with Approach 1 (lower CPI) because:
1. You're overshooting (CPI too high for precision)
2. High-level CS:GO = used to low sensitivity
3. Easier to iterate (P1→P2 can adjust CPI finer)

---

## Next Profiles After P1

### If P1 Improves Accuracy:
- **P2**: Fine-tune CPI (400 → 350 or 450)
- **P3**: Test different scaler values
- **P4**: Test polling rate changes

### If P1 Makes Things Worse:
- **P2-alt**: Try different approach (scaler adjustment instead)
- Or: Increase CPI instead (600 → 800)

---

## Comparison Framework

After each profile, generate comparison report:

```
Profile: P1-CPI400
Previous: P0-current-3mon

A1 Aim Speed:
  P0: 950ms, 932ms, 1263ms (avg: 1048ms)
  P1: [data]
  Change: [+/- X ms] [better/worse]

A2 Tiny Target:
  P0: 100, 125, 112 (avg: 112)
  P1: [data]
  Change: [+/- X points] [better/worse]

S1 Scroll:
  P0: [X overscrolls]
  P1: [data]
  Change: [+/- X] [better/worse]

Decision: KEEP / ITERATE / PIVOT
Reasoning: [based on objective data]
Next: [P2 direction or stop]
```

---

## Files Created for Pipeline

- `log_benchmark_data.ps1` - Structured data logging
- `compare_profiles.ps1` - Generate comparison reports
- `PIPELINE.md` - This file (iteration workflow)

---

## Ready State

**P0 → P1 Transition:**
1. Complete P0 gaps (15 min)
2. Generate P0 analysis report
3. Create P1 profile (firmware change)
4. Run P1 tests (focus on A1, A2, S1)
5. Generate P1 vs P0 comparison
6. Make decision for P2

**Focus:** Streamlined iteration with objective data.
