# Trackball Benchmark Guide - STREAMLINED

## Quick Start

```powershell
cd C:\Users\sondr\splitted_zmk_keyboard\runtime\trackball_benchmarks

# Create session
.\start_benchmark_session.ps1 -ProfileName "P0-current-3mon"

# Open browser tests
start .\tools\browser_tests_CLEANED.html

# Run tests and log results as you go
```

---

## Current Session

**P0-current-3mon_20260620_144448** ✅ VALID

- Display count: 3
- Horizontal span: 6720 px
- Windows MouseSensitivity: 20
- Acceleration: 0/0/0 (disabled)
- PowerToys MouseWithoutBorders: Running
- AutoHotkey: Running

**Results file:**
```
results\P0-current-3mon_20260620_144448\P0-current-3mon_results.md
```

---

## Test Order (Objective Tests Only)

### R1 - Report Rate (10 min)

**Tool:** `.\tools\MouseTester.exe`

1. Launch MouseTester
2. Move trackball:
   - Slow circles 10s
   - Fast circles 10s
   - Horizontal sweeps 10s
3. Look at bottom stats for frequency/interval
4. Log: Average Hz, interval range, any stalls

### R2 - Motion Consistency (10 min)

**Tool:** Same MouseTester

1. Move slow horizontal line
2. Move slow diagonal
3. Move fast circles
4. Screenshot graph
5. Save to `screenshots\`
6. Log: Smoothness notes, spike count

### R3 - Browser Polling (5 min)

**Tool:** TestUFO (from browser_tests_CLEANED.html)

1. Open TestUFO link
2. Move fast for 10s
3. Log: Hz shown

**Auto-log example:**
```powershell
.\auto_log_results.ps1 -SessionFolder "results\P0-current-3mon_20260620_144448" -TestName "R3" -Result "TestUFO: 115 Hz average"
```

### A1 - Aim Speed (15 min)

**Tool:** Human Benchmark Aim Trainer

1. Run 3 times
2. Log each average ms/target

**Your quick validation:** 950ms, 932ms, 1263ms

### A2 - Tiny Target Accuracy (15 min) ⭐ BEST TEST

**Tool:** MouseAccuracy.com (full-screen)

1. Settings: 30s, smallest targets
2. Run 3 times
3. Log scores

**Your quick validation:** 100, 125, 112

### P1 - Precision (15 min)

**Tool:** Choose ONE:
- Sequence Memory
- Chimp Test

1. Run 3 times
2. Log highest level reached each time
3. **NO SELF-EVALUATION** - uses objective scores only

### S1 - Scroll (10 min)

**Tool:** Wikipedia long article

1. Do 10 tiny scrolls
2. Do 10 medium scrolls
3. Do 10 fast scrolls
4. Count overscrolls
5. Log: Overscroll count, controllability yes/no

### O1, O2, O3 - Office Tasks (30 min)

**O1 - Browser:**
- Open/close 10 tabs using tiny X buttons
- Time it, count misclicks

**O2 - VS Code:**
- Place caret at 10 positions
- Select 5 text spans
- Count misclicks/failures

**O3 - Terminal:**
- Select 3 commands/paths
- Count failures

---

## Logging Results

### Manual (current method):
Open your results file and fill in as you go.

### Auto-log (when data is numeric):
```powershell
.\auto_log_results.ps1 -SessionFolder "results\P0-current-3mon_20260620_144448" -TestName "A1-Run1" -Result "950ms avg"
```

---

## Tools Status

✅ **MouseTester.exe** - Working (R1 + R2)
✅ **browser_tests_CLEANED.html** - Working browser tests only
✅ **TestUFO** - Working (115 Hz confirmed)
✅ **Human Benchmark** - Working
✅ **MouseAccuracy.com** - Working (user's favorite)
❌ **MLMP** - Never successfully downloaded (ignore)
❌ **Stopwatch/SpeedTest.pl** - Broken (removed)

---

## Key Findings from Quick Validation

**User feedback:**
- "Very hard to be accurate, overshooting, or unable to make a clean path"
- High-level CS:GO player with exceptional mouse accuracy
- Current P0 profile shows accuracy/control issues

**This baseline will show HOW MUCH improvement is possible** with proper tuning.

---

## After Baseline

1. Identify pain points from data
2. Create targeted profile (e.g., P1-lower-CPI for better accuracy)
3. Run same tests
4. Compare objective scores
5. Keep improving profile or test new approach

**No self-evaluation. Numbers only.**

---

## Files

```
GUIDE.md                               ← This file (single source of truth)
start_benchmark_session.ps1            ← Create sessions
auto_log_results.ps1                   ← Log results automatically
verify_setup.ps1                       ← Verify display/tools
tools/browser_tests_CLEANED.html       ← Working tests only
tools/MouseTester.exe                  ← R1 + R2 tool
results/P0-current-3mon_20260620_144448/ ← Current valid session
```

**Removed messy docs:**
- SETUP_COMPLETE.md
- START_HERE.md
- RECONNECT_MONITORS_THEN_RUN.md
- quick_validation.ps1
- All redundant tool guides

---

## Ready to Run Full Baseline

Session is valid. Tools work. Quick validation done.

**Run full tests now and log results.**

Use auto_log_results.ps1 when you have numeric data to speed things up.
