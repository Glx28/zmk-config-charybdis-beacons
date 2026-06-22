# Trackball Benchmark Protocol

Objective testing for Charybdis PMW3610 trackball tuning.

## Current Configuration (P0-current-3mon Baseline)

### Firmware
- CPI: 600
- Snipe CPI: 1600
- XY scaler: 2:1
- Scroll scaler: 2:1
- Polling: 125_SW
- Smart algorithm: ON

### Windows
- MouseSensitivity: 20
- Acceleration: 0/0/0

### Display
- 3 monitors, 6720 px horizontal span

---

## Test Protocol - Objective Tests Only

### R1 — Report-Rate Stability (MouseTester, 10 min)

**Patterns:** Slow circles 10s, fast circles 10s, horizontal sweeps 10s
**Record:** Avg Hz, interval range, stall count

### R2 — Motion Consistency (MouseTester, 10 min)

**Patterns:** Slow horizontal, slow diagonal, fast circles
**Record:** Graph smoothness, spike count, screenshot path

### R3 — Browser Polling (TestUFO, 5 min)

**Run:** Fast circles 10s
**Record:** Hz shown

### A1 — Aim Speed (Human Benchmark, 15 min)

**Run:** 3× 30-target tests
**Record:** Avg ms/target for each run

### A2 — Tiny Target Accuracy (MouseAccuracy.com, 15 min)

**Settings:** 30s, smallest targets
**Run:** 3 times
**Record:** Score for each run

### P1 — Precision (Sequence Memory or Chimp Test, 15 min)

**Run:** 3 times
**Record:** Highest level reached each time

### S1 — Scroll Granularity (Wikipedia article, 10 min)

**Run:** 10 tiny scrolls, 10 medium, 10 fast
**Record:** Overscroll count, controllability yes/no

### O1 — Browser Task (10 min)

**Tasks:** Open/close 10 tabs (tiny X buttons)
**Record:** Time, misclick count

### O2 — VS Code Task (15 min)

**Tasks:** 10 caret placements, 5 text selections
**Record:** Time, misclick count, failed selection count

### O3 — Terminal Task (10 min)

**Tasks:** Select 3 commands/paths
**Record:** Failure count

### O4 — RDP/VM Task *(Skip for baseline)*

Only run for promising candidate profiles.

### F1 — Fatigue *(Skip for baseline)*

Only run for promising candidate profiles.

---

## Scoring

| Category | Weight |
|----------|--------|
| Tiny-target accuracy (A2) | 30% |
| Aim speed (A1) | 20% |
| Precision (P1) | 20% |
| Report stability (R1) | 10% |
| Three-monitor travel | 10% |
| Scroll control (S1) | 7% |
| Fatigue (F1) | 3% |

---

## Hard Fail Conditions

- Improved travel but increased tiny-target misses
- More >40ms stalls than baseline without accuracy improvement
- Works locally but bad in RDP/VM
- Significantly increased fatigue

---

## Files

- **GUIDE.md** - Streamlined quick-start guide
- **start_benchmark_session.ps1** - Create new sessions
- **auto_log_results.ps1** - Automated result logging
- **tools/browser_tests_CLEANED.html** - Working browser tests
- **tools/MouseTester.exe** - R1 and R2 tests

---

## Workflow

1. Create session: `.\start_benchmark_session.ps1 -ProfileName "ProfileName"`
2. Run tests in order (R1→R2→R3→A1→A2→P1→S1→O1→O2→O3)
3. Log results (manual or use auto_log_results.ps1 for numeric data)
4. Save screenshots to `screenshots\`
5. Compare profiles using objective scores

**No self-evaluation. Objective measurements only.**
