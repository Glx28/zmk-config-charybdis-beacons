# START HERE - P0→P1 Transition

## Pipeline is Ready

Clean iterative workflow created:
- ✅ Structured data logging (JSON)
- ✅ Automated comparison reports
- ✅ P0→P1→P2... iteration framework
- ✅ Streamlined testing (30 min vs 2-3 hours)

---

## Run This Command Now

```powershell
cd C:\Users\sondr\splitted_zmk_keyboard\runtime\trackball_benchmarks
.\complete_P0_and_prepare_P1.ps1
```

### What This Does (15 minutes)

1. **Logs your quick validation data:**
   - A1: 950, 932, 1263 ms
   - A2: 100, 125, 112
   - R3: 115 Hz

2. **Completes P0 gaps:**
   - Prompts for R2 screenshot (5 min)
   - Prompts for S1 scroll test (5 min)

3. **Generates P1 recommendation:**
   - Analysis of P0 data
   - Specific firmware change (CPI 600 → 400)
   - Predicted outcomes
   - Next steps

4. **Saves structured data** for automated comparison

---

## After Completing P0

### Build P1 Firmware

**Change:** `CONFIG_PMW3610_CPI=600` → `CONFIG_PMW3610_CPI=400`

### Test P1 (30 min - Critical Metrics Only)

```powershell
# Create session
.\start_benchmark_session.ps1 -ProfileName "P1-CPI400"

# Test A1 (aim speed) - 3 runs
.\log_benchmark_data.ps1 -Profile "P1-CPI400" -Test "A1" -Run1 [X] -Run2 [Y] -Run3 [Z]

# Test A2 (tiny-target) - 3 runs ⭐ YOUR FAVORITE
.\log_benchmark_data.ps1 -Profile "P1-CPI400" -Test "A2" -Run1 [X] -Run2 [Y] -Run3 [Z]

# Test S1 (scroll) - count overscrolls
.\log_benchmark_data.ps1 -Profile "P1-CPI400" -Test "S1" -Overscrolls [X]
```

### Compare

```powershell
.\compare_profiles.ps1 -Profile1 "P0-current-3mon" -Profile2 "P1-CPI400"
```

### Decide

- **KEEP**: P1 significantly better → daily driver
- **ITERATE**: P1 better → refine to P2 (CPI 350 or 450)
- **PIVOT**: P1 worse → try different approach

---

## Why P1 Will Likely Work

**Your feedback:**
- "Very hard to be accurate"
- "Overshooting"
- "Unable to make a clean path"

**You are:** High-level CS:GO player (top-tier mouse accuracy)

**Current:** CPI 600 (too high for precision work)

**P1:** CPI 400 (better control, less overshoot)

**Expected:** A2 score ↑, S1 overscrolls ↓, A1 slightly slower but more accurate

---

## Files (Clean)

```
START.md                         ← This file
P0_TO_P1_READY.md                ← Full details
PIPELINE.md                      ← Methodology
GUIDE.md                         ← Quick reference
README.md                        ← Protocol

complete_P0_and_prepare_P1.ps1   ← Run this now
log_benchmark_data.ps1           ← Log results
compare_profiles.ps1             ← Compare profiles
start_benchmark_session.ps1      ← Create sessions
verify_setup.ps1                 ← Verify setup
```

---

## Next Command

```powershell
.\complete_P0_and_prepare_P1.ps1
```

**Go.**
