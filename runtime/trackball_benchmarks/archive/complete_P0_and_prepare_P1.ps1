# Complete P0 Baseline and Prepare for P1
# Streamlined workflow for P0→P1 transition

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "P0→P1 Transition Workflow" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if P0 session exists
$p0Session = Get-ChildItem -Path "results\P0-current-3mon_*" -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $p0Session) {
    Write-Host "ERROR: P0 session not found" -ForegroundColor Red
    Write-Host "Run: .\start_benchmark_session.ps1 -ProfileName 'P0-current-3mon'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Found P0 session: $($p0Session.Name)" -ForegroundColor Green
Write-Host ""

# Check for existing data
$dataFile = Join-Path $p0Session.FullName "benchmark_data.json"
$hasData = Test-Path $dataFile

if ($hasData) {
    $data = Get-Content $dataFile -Raw | ConvertFrom-Json
    Write-Host "Existing P0 data found:" -ForegroundColor Yellow
    foreach ($test in $data.tests.PSObject.Properties) {
        Write-Host "  ✅ $($test.Name)" -ForegroundColor Green
    }
    Write-Host ""
}

# Step 1: Log quick validation results
Write-Host "[Step 1/4] Log Quick Validation Results" -ForegroundColor Cyan
Write-Host ""

if (-not $hasData -or -not $data.tests.A1) {
    Write-Host "You reported A1 results: 950ms, 932ms, 1263ms" -ForegroundColor Yellow
    $confirm = Read-Host "Log these now? (y/n)"
    if ($confirm -eq "y") {
        .\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "A1" -Run1 950 -Run2 932 -Run3 1263
        Write-Host ""
    }
}

if (-not $hasData -or -not $data.tests.A2) {
    Write-Host "You reported A2 results: 100, 125, 112" -ForegroundColor Yellow
    $confirm = Read-Host "Log these now? (y/n)"
    if ($confirm -eq "y") {
        .\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "A2" -Run1 100 -Run2 125 -Run3 112
        Write-Host ""
    }
}

if (-not $hasData -or -not $data.tests.R3) {
    Write-Host "You reported R3 result: 115 Hz" -ForegroundColor Yellow
    $confirm = Read-Host "Log this now? (y/n)"
    if ($confirm -eq "y") {
        .\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "R3" -Hz 115
        Write-Host ""
    }
}

# Step 2: R2 Screenshot
Write-Host "[Step 2/4] R2 Motion Consistency Screenshot" -ForegroundColor Cyan
Write-Host ""
Write-Host "ACTION REQUIRED:" -ForegroundColor Yellow
Write-Host "  1. Launch: .\tools\MouseTester.exe" -ForegroundColor White
Write-Host "  2. Move trackball slow horizontal line" -ForegroundColor White
Write-Host "  3. Screenshot the graph" -ForegroundColor White
Write-Host "  4. Save to: screenshots\P0-R2-motion.png" -ForegroundColor White
Write-Host ""
$r2Done = Read-Host "Screenshot saved? (y/n)"

if ($r2Done -eq "y") {
    .\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "R2" -Screenshot "screenshots\P0-R2-motion.png" -Notes "Slow horizontal motion"
    Write-Host ""
}

# Step 3: S1 Scroll Test
Write-Host "[Step 3/4] S1 Scroll Granularity Test (5 min)" -ForegroundColor Cyan
Write-Host ""
Write-Host "ACTION REQUIRED:" -ForegroundColor Yellow
Write-Host "  1. Open: https://en.wikipedia.org/wiki/Computer_mouse" -ForegroundColor White
Write-Host "  2. Do 10 tiny thumb scrolls" -ForegroundColor White
Write-Host "  3. Do 10 medium thumb scrolls" -ForegroundColor White
Write-Host "  4. Do 10 fast thumb scrolls" -ForegroundColor White
Write-Host "  5. Count how many times you overscrolled (went past target)" -ForegroundColor White
Write-Host ""
$overscrolls = Read-Host "Enter overscroll count (number)"

if ($overscrolls -match '^\d+$') {
    .\log_benchmark_data.ps1 -Profile "P0-current-3mon" -Test "S1" -Overscrolls ([int]$overscrolls)
    Write-Host ""
}

# Step 4: P0 Analysis
Write-Host "[Step 4/4] P0 Analysis" -ForegroundColor Cyan
Write-Host ""

# Reload data
$data = Get-Content $dataFile -Raw | ConvertFrom-Json

Write-Host "P0 Baseline Summary:" -ForegroundColor Yellow
Write-Host ""

if ($data.tests.A1) {
    Write-Host "  A1 Aim Speed: $($data.tests.A1.average) ms avg" -ForegroundColor White
    Write-Host "    Runs: $($data.tests.A1.run1), $($data.tests.A1.run2), $($data.tests.A1.run3)" -ForegroundColor Gray
}

if ($data.tests.A2) {
    Write-Host "  A2 Tiny Target: $($data.tests.A2.average) score avg" -ForegroundColor White
    Write-Host "    Runs: $($data.tests.A2.run1), $($data.tests.A2.run2), $($data.tests.A2.run3)" -ForegroundColor Gray
}

if ($data.tests.R3) {
    Write-Host "  R3 Browser Rate: $($data.tests.R3.hz) Hz" -ForegroundColor White
}

if ($data.tests.S1) {
    Write-Host "  S1 Scroll: $($data.tests.S1.overscrolls) overscrolls" -ForegroundColor White
}

Write-Host ""
Write-Host "User Feedback:" -ForegroundColor Yellow
Write-Host "  - Very hard to be accurate" -ForegroundColor White
Write-Host "  - Overshooting" -ForegroundColor White
Write-Host "  - Unable to make a clean path" -ForegroundColor White
Write-Host ""

# P1 Recommendation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "P1 Recommendation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Problem: Accuracy and overshoot issues" -ForegroundColor Yellow
Write-Host "Current: CPI 600, XY scaler 2:1" -ForegroundColor White
Write-Host ""
Write-Host "Hypothesis: CPI too high for precision work" -ForegroundColor Cyan
Write-Host ""
Write-Host "P1 Profile Recommendation:" -ForegroundColor Green
Write-Host "  Change: CPI 600 → 400" -ForegroundColor White
Write-Host "  Keep: XY scaler 2:1, all other settings same" -ForegroundColor White
Write-Host "  Prediction: Better accuracy, reduced overshoot, similar travel speed" -ForegroundColor White
Write-Host ""
Write-Host "Expected P1 Results:" -ForegroundColor Cyan
Write-Host "  - A2 score increase (better tiny-target accuracy)" -ForegroundColor White
Write-Host "  - S1 overscroll reduction (better control)" -ForegroundColor White
Write-Host "  - A1 may increase slightly (slower but more accurate)" -ForegroundColor White
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Modify firmware: CONFIG_PMW3610_CPI=400" -ForegroundColor Cyan
Write-Host "  2. Build and flash P1 firmware" -ForegroundColor Cyan
Write-Host "  3. Run: .\start_benchmark_session.ps1 -ProfileName 'P1-CPI400'" -ForegroundColor Cyan
Write-Host "  4. Test ONLY: A1, A2, S1 (critical metrics)" -ForegroundColor Cyan
Write-Host "  5. Run: .\compare_profiles.ps1 -Profile1 'P0-current-3mon' -Profile2 'P1-CPI400'" -ForegroundColor Cyan
Write-Host "  6. Make decision: KEEP / ITERATE / PIVOT" -ForegroundColor Cyan
Write-Host ""

# Save P1 recommendation
$p1Rec = @"
P1 Profile Recommendation
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Based on P0 baseline analysis:

Problem:
- Hard to be accurate
- Overshooting
- Unable to make clean path
- User is high-level CS:GO player (expects precision)

Current P0 Config:
- CPI: 600
- XY scaler: 2:1
- Scroll scaler: 2:1
- Polling: 125_SW

P1 Hypothesis:
CPI too high for precision work. Lower CPI should improve accuracy and reduce overshoot.

P1 Changes:
- CPI: 600 → 400
- Keep all other settings identical

Predicted Outcomes:
- A2 (tiny-target): Increase (better accuracy)
- S1 (scroll): Fewer overscrolls (better control)
- A1 (aim speed): May increase slightly (slower but more accurate)

Firmware Change:
CONFIG_PMW3610_CPI=400

Critical Tests for P1:
- A1 (3 runs)
- A2 (3 runs)
- S1 (overscroll count)

Decision Criteria:
- KEEP if A2 improves significantly
- ITERATE to P2 (fine-tune CPI) if marginal improvement
- PIVOT to different approach if worse
"@

$p1RecFile = "results\P1_recommendation.txt"
$p1Rec | Set-Content $p1RecFile

Write-Host "P1 recommendation saved to: $p1RecFile" -ForegroundColor Gray
Write-Host ""
