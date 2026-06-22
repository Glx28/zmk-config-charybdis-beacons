# Charybdis Trackball Benchmark Protocol

## Overview

This is a rigorous, repeatable benchmark suite for the Charybdis PMW3610 right-thumb trackball on Windows 11. The goal is to provide objective data for firmware and software tuning decisions relevant to office and developer workflows.

## Constraints

### Hard Constraints

**NOT ALLOWED:**
- Physical modifications
- Ball replacement
- Bearing changes
- Sensor repositioning
- Case modifications
- Hardware changes

**ALLOWED:**
- Software/firmware/host configuration changes
- Firmware changes (with clear rollback procedures)

### Test Quality Requirements

**NOT ALLOWED:**
- Vague subjective tests
- Trivial "caveman" tests
- Anecdotal comparisons

**REQUIRED:**
- Objective or semi-objective benchmark tasks
- Relevance to office/developer work
- Consistent methodology
- Baseline measurement before tuning
- Coarse-to-fine bracketing after baseline

---

## Current Setup

### Hardware
- **Keyboard:** V&Z Charybdis split keyboard
- **Trackball:** PMW3610 on right thumb side
- **OS:** Windows 11

### Repository
- **Path:** `C:\Users\sondr\splitted_zmk_keyboard`
- **Build target:** `vendor\vzhao-zmk-for-charybdis-main-20250226`

### Current Firmware Configuration

```
CONFIG_PMW3610_CPI=600
CONFIG_PMW3610_SNIPE_CPI=1600
CONFIG_PMW3610_CPI_DIVIDOR=1
CONFIG_PMW3610_SNIPE_CPI_DIVIDOR=1
CONFIG_PMW3610_SCROLL_TICK=70
CONFIG_PMW3610_POLLING_RATE_125_SW=y
CONFIG_PMW3610_SMART_ALGORITHM=y
CONFIG_PMW3610_ORIENTATION_90=y
CONFIG_PMW3610_INVERT_X=y
```

**Keymap settings:**
- `scroll-layers = <1>;`
- `snipe-layers = <8>;`
- AutoMouse: currently commented out
- Active overlay mentions: `// automouse-layer = <3>;`
- Variant script writes: `automouse-layer = <2>;`
- **Note:** Do not enable AutoMouse until discrepancy is resolved

**Input processors:**
- Pointer scaler: `&zip_xy_scaler 2 1`
- Scroll scaler: `&zip_scroll_scaler 2 1`

### Current Windows Configuration

**Pointer settings:**
- `SPI_GETMOUSESPEED=20`
- `MouseSensitivity=20`
- Classic acceleration tuple: `0/0/0`

**Display layout:**
- DISPLAY1: `-2880,0,1440x900`
- DISPLAY2 (primary): `0,0,1920x1080`
- DISPLAY3: `1920,0,1920x1080`
- Total horizontal span: ~6720 px

**Running software:**
- AutoHotkey v2
- PowerToys
- PowerToys Mouse Without Borders

**Note:** Other pointing devices are present. Ensure Charybdis trackball is the active device during benchmarks.

---

## Folder Structure

```
runtime/trackball_benchmarks/
├── README.md                    (this file)
├── start_benchmark_session.ps1  (session starter script)
├── tools/                       (benchmark tool installers/executables)
├── results/                     (timestamped session folders)
│   ├── trackball_profile_results_template.md
│   ├── trackball_results.csv
│   └── [ProfileName_YYYYMMDD_HHMMSS]/
│       ├── session_info.txt
│       └── [ProfileName]_results.md
├── screenshots/                 (test result screenshots)
├── profiles/                    (firmware profile configs)
└── notes/                       (general observations)
```

---

## Profiles

### P0-current (Baseline)

This is the current configuration and serves as the baseline for all comparisons.

**Configuration:**
- Windows speed: 20
- CPI: 600
- Snipe CPI: 1600
- XY scaler: 2:1
- Scroll scaler: 2:1
- Scroll tick: 70
- Polling: 125_SW
- Smart algorithm: on
- AutoMouse: off/commented
- PowerToys MouseWithoutBorders: running

**All new profiles must be compared against P0-current.**

---

## Required Tests

Run all tests in the order listed below for each profile.

### R1 — Raw Report-Rate Stability

**Purpose:** Measure consistency and stability of sensor polling.

**Tool:** WindowsMouseRateChecker or equivalent Raw Input mouse-rate checker

**Procedure:**

1. **Slow circles (10 seconds)**
   - Move trackball in slow, steady circles
   - Record: Average Hz, Median interval, p95 interval, p99 interval, Max interval, Stalls >20 ms, Stalls >40 ms

2. **Fast circles (10 seconds)**
   - Move trackball in fast circles
   - Record: Average Hz, Median interval, p95 interval, p99 interval, Max interval, Stalls >20 ms, Stalls >40 ms

3. **Long horizontal sweeps (10 seconds)**
   - Move trackball in long left-right sweeps across all three monitors
   - Record: Average Hz, Median interval, p95 interval, p99 interval, Max interval, Stalls >20 ms, Stalls >40 ms

**Notes:**
- Ensure no other pointer devices are moving during capture
- Note any patterns in stalls (e.g., direction-dependent, speed-dependent)

---

### R2 — Motion Consistency

**Purpose:** Visualize and analyze smoothness and consistency of motion curves.

**Tool:** MouseTester or equivalent

**Procedure:**

1. **Slow straight horizontal movement**
   - Move trackball slowly in a straight line horizontally
   - Observe plot for smoothness, spikes, flat spots

2. **Slow diagonal movement**
   - Move trackball slowly at approximately 45-degree diagonal
   - Observe plot for smoothness, X/Y balance

3. **Fast circles**
   - Move trackball in fast circular motions
   - Observe plot for smoothness, interval spikes, X/Y balance

**Record:**
- Plot quality notes for each movement type
- Interval spikes (count and severity)
- Flat spots (stuck intervals)
- Uneven X/Y response
- Screenshot path

---

### R3 — Browser Polling Sanity

**Purpose:** Verify that browser-level mouse event rates are reasonable.

**Tool:** TestUFO Mouse Rate or equivalent browser-based mouse-rate test

**Procedure:**

1. **Fast circles (10 seconds)**
   - Open test in browser on primary monitor
   - Move trackball in fast circles
   - Record: Typical Hz, Peak Hz, Jitter notes

2. **Horizontal sweeps (10 seconds)**
   - Move trackball in horizontal sweeps
   - Record: Typical Hz, Peak Hz, Jitter notes

**Record:**
- Browser used (Chrome, Edge, Firefox, etc.)
- Monitor used
- General jitter observations

---

### A1 — Small-Target Aim

**Purpose:** Measure target acquisition speed on small but reasonable-sized targets.

**Tool:** Human Benchmark Aim Trainer (30-target test) or equivalent

**Procedure:**

1. Run test 3 times
2. Record average ms/target for each run
3. Calculate median, best, worst

**Record:**
- Run 1 average ms/target
- Run 2 average ms/target
- Run 3 average ms/target
- Median
- Best
- Worst
- Misclick notes

---

### A2 — Tiny-Target Accuracy

**Purpose:** Measure accuracy on very small targets under time pressure.

**Tool:** MouseAccuracy or equivalent

**Settings:**
- Duration: 30 seconds
- Target size: smallest/tiny available
- Speed: normal/default

**Procedure:**

1. Run test 3 times
2. Record hits, misses, accuracy percentage for each run

**Record:**
- Run 1: Hits, Misses, Accuracy, Score
- Run 2: Hits, Misses, Accuracy, Score
- Run 3: Hits, Misses, Accuracy, Score
- General notes

---

### P1 — Path/Drag Precision

**Purpose:** Measure precision in path-following, shape-tracing, and steady-hand tasks.

**Tool:** XBitLabs mouse accuracy/path tests or equivalent

**Procedure:**

1. **Path following**
   - Follow a curved path without going out of bounds
   - Record: Score, Deviation, Out-of-bounds count

2. **Shape tracing**
   - Trace a specific shape (circle, star, etc.)
   - Record: Score, Deviation, Out-of-bounds count

3. **Precision clicking**
   - Click on very small targets in sequence
   - Record: Score, Failures

4. **Steady hand / Corridor**
   - Move cursor through narrow corridor without touching edges
   - Record: Score, Failures, Out-of-bounds count

**Record:**
- Individual scores for each sub-test
- Screenshot path if available
- General notes on difficulty areas

---

### S1 — Scroll Granularity

**Purpose:** Evaluate scroll control across different intensities.

**Tool:** Fixed long web page, local Markdown preview, or dedicated scroll tester

**Procedure:**

1. **Tiny thumb scrolls (10 scrolls)**
   - Make 10 very small scroll motions
   - Record controllability: Can you reliably scroll by 1-3 lines?

2. **Medium thumb scrolls (10 scrolls)**
   - Make 10 medium-intensity scrolls
   - Record distance: Approximately how many lines per scroll?

3. **Fast thumb scrolls (10 scrolls)**
   - Make 10 fast/aggressive scrolls
   - Record behavior: Does it overshoot? Is it predictable?

**Record:**
- Tiny scroll controllability
- Medium scroll distance
- Fast scroll behavior
- Overscroll count (scrolled past intended target)
- Reverse-scroll correction count (had to scroll back)
- General notes

---

### O1 — Browser Office Task

**Purpose:** Measure real-world browser UI interaction performance.

**Tool:** Normal browser on primary monitor

**Procedure:**

1. **Open 10 tabs** (any websites)
2. **Close all 10 tabs** using the tiny tab close buttons (X)
3. **Select 10-20 characters** from the middle of a paragraph
4. **Drag one tab** left or right and drop it accurately
5. **Click three small UI controls** (e.g., extension icon, bookmark/star, menu button)

**Record:**
- Total time
- Misclicks (clicked wrong element)
- Overshoots (went past target, had to correct)
- Correction movements (extra movements to acquire target)
- Accidental drags (started drag when you meant to click)
- General notes

---

### O2 — VS Code / IDE Task

**Purpose:** Measure text editing and IDE UI interaction performance.

**Tool:** VS Code or your primary IDE

**Procedure:**

1. **Place caret at 10 exact text positions** (e.g., specific variable names, function calls)
2. **Select 5 short text spans** (e.g., variable names, function parameters)
3. **Click gutter/breakpoint column 5 times** to set/unset breakpoints
4. **Drag scrollbar or minimap** to a specific target code region
5. **Resize a panel/split once** (e.g., adjust terminal height or sidebar width)

**Record:**
- Total time
- Misclicks
- Failed selections (had to retry selection)
- Overshoots
- Correction movements
- General notes

---

### O3 — Terminal Task

**Purpose:** Measure terminal interaction performance.

**Tool:** Your primary terminal (PowerShell, Windows Terminal, etc.)

**Procedure:**

1. **Select one command** from scrollback history or output
2. **Select one path-like string** from output
3. **Click close/minimize/split/tab UI** if present
4. **Resize terminal pane** if applicable

**Record:**
- Selection failures
- Overshoots
- Correction movements
- General notes

---

### O4 — RDP/VM Task

**Purpose:** Evaluate trackball performance in remote desktop or VM scenarios.

**Note:** Only run this test for **promising profiles** (not every profile).

**Tool:** RDP session or VM

**Procedure:**

1. **5 browser tiny close-button clicks** (close 5 tabs in browser inside RDP/VM)
2. **3 text selections** (select short text spans)
3. **10 small target clicks** (any small UI elements)

**Record:**
- Same / Worse / Much worse than local
- Pointer lag notes
- Overshoot notes
- Misses
- General notes

---

### F1 — Fatigue Block

**Purpose:** Evaluate comfort and fatigue during extended use.

**Note:** Only run this test for **promising profiles** (not every profile).

**Procedure:**

1. Use the profile for **20 minutes of real work** (coding, browsing, document editing, etc.)
2. After 20 minutes, immediately record fatigue levels

**Record:**
- Thumb fatigue (0-10 scale, where 0 = no fatigue, 10 = severe fatigue)
- Wrist/hand discomfort (0-10 scale)
- Urge to switch device (0-10 scale, where 0 = perfectly comfortable, 10 = desperate to switch)
- Any pain or strain notes

---

## Scoring System

### Weighted Scoring

| Category | Weight | Description |
|----------|--------|-------------|
| **Tiny-target accuracy** | 30% | A2 test results |
| **Fitts/target acquisition speed** | 20% | A1 test results |
| **Path/drag precision** | 20% | P1 test results |
| **Report stability** | 10% | R1 test results (stall counts, interval consistency) |
| **Three-monitor travel** | 10% | Subjective ease of moving across 6720 px span |
| **Scroll control** | 7% | S1 test results |
| **Fatigue** | 3% | F1 test results |
| **TOTAL** | **100%** | |

### Hard Fail Conditions

**A profile automatically FAILS if any of the following are true:**

1. **Improved travel but clearly increased tiny-target misses**
   - Example: Faster cross-monitor travel but A2 accuracy drops from 85% to 65%

2. **More frequent >40 ms stalls than baseline without dramatic accuracy improvement**
   - Example: Baseline has 2 stalls >40 ms, new profile has 15 stalls, but accuracy is same or worse

3. **Works locally but bad in RDP/VM**
   - Example: Profile is great locally but unusable in RDP sessions (critical for work)

4. **Significantly increased fatigue**
   - Example: Baseline fatigue is 3/10, new profile is 8/10

**Hard fail = profile is rejected regardless of scoring.**

---

## Workflow

### Starting a Benchmark Session

1. Open PowerShell in `runtime/trackball_benchmarks`

2. Run session starter script:
   ```powershell
   .\start_benchmark_session.ps1 -ProfileName "P0-current"
   ```

3. The script will:
   - Print current system state
   - Create a timestamped session folder
   - Copy the results template
   - Save session info to file

4. Open the results file in the session folder

5. Run tests in order (R1, R2, R3, A1, A2, P1, S1, O1, O2, O3, O4*, F1*)
   - *O4 and F1 only for promising profiles

6. Fill in results as you complete each test

7. Save screenshots to `screenshots/` folder

8. Update CSV file with summary data

### Comparing Profiles

1. Run full benchmark suite on **P0-current** (baseline)

2. Identify 2-3 specific pain points from baseline results

3. Create new profile targeting one pain point at a time

4. Run full suite on new profile

5. Compare against baseline using scoring system

6. If new profile passes (no hard fails, higher score), it becomes new baseline

7. Repeat coarse-to-fine bracketing

### Coarse-to-Fine Bracketing

**Example: Improving cross-monitor travel**

1. **Baseline:** CPI=600, XY scaler=2:1
   - Travel feels slow

2. **Coarse test:** CPI=1200, XY scaler=2:1
   - Run suite, check for accuracy regressions

3. **If coarse test passes:**
   - Try finer adjustments: CPI=900, CPI=1000, CPI=1100
   - Find sweet spot

4. **If coarse test fails:**
   - Try smaller step: CPI=800
   - Or try different approach: CPI=600, XY scaler=3:1

---

## Tools Required

### Install or Open These Tools

| Purpose | Tool |
|---------|------|
| Raw report rate | WindowsMouseRateChecker or equivalent Raw Input mouse-rate tool |
| Motion plots | MouseTester |
| Browser sanity rate | TestUFO Mouse Rate (browser-based) |
| Small target aim | Human Benchmark Aim Trainer (browser-based) |
| Tiny target accuracy | MouseAccuracy or equivalent |
| Path/shape/drag | XBitLabs mouse accuracy/path tools or equivalent |
| Scroll | Long fixed page, local Markdown preview, or mouse scroll tester |

**Installation notes:**
- WindowsMouseRateChecker: May need to download from GitHub or equivalent
- MouseTester: Available online, may need manual download
- TestUFO Mouse Rate: Browser-based, no install needed
- Human Benchmark: Browser-based, no install needed
- MouseAccuracy: May need to download or use web-based alternative
- XBitLabs: May need to download or use web-based alternative

---

## Notes

- **Do NOT tune firmware yet unless explicitly asked**
- This protocol is for establishing baseline and preparing for future tuning
- Focus on consistent, repeatable methodology
- Record everything, even seemingly minor observations
- When in doubt, add more notes rather than fewer
- Screenshots are valuable for comparing plots and results later

---

## Next Steps

1. Install/locate required benchmark tools
2. Run `start_benchmark_session.ps1` to create your first session
3. Complete full P0-current baseline benchmark
4. Review results and identify pain points
5. Consult with user before creating new profiles for testing
