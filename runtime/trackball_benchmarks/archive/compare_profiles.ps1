# Profile Comparison Report Generator

param(
    [Parameter(Mandatory=$true)]
    [string]$Profile1,  # Baseline (e.g., "P0-current-3mon")

    [Parameter(Mandatory=$true)]
    [string]$Profile2   # New profile (e.g., "P1-CPI400")
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Profile Comparison Report" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Find session folders
$session1Pattern = "results\${Profile1}_*"
$session2Pattern = "results\${Profile2}_*"

$session1 = Get-ChildItem -Path $session1Pattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
$session2 = Get-ChildItem -Path $session2Pattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $session1) {
    Write-Host "ERROR: Session not found for $Profile1" -ForegroundColor Red
    exit 1
}

if (-not $session2) {
    Write-Host "ERROR: Session not found for $Profile2" -ForegroundColor Red
    exit 1
}

# Load data
$data1File = Join-Path $session1.FullName "benchmark_data.json"
$data2File = Join-Path $session2.FullName "benchmark_data.json"

if (-not (Test-Path $data1File)) {
    Write-Host "ERROR: No benchmark data found for $Profile1" -ForegroundColor Red
    Write-Host "Run: .\log_benchmark_data.ps1 to log test results" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path $data2File)) {
    Write-Host "ERROR: No benchmark data found for $Profile2" -ForegroundColor Red
    exit 1
}

$data1 = Get-Content $data1File -Raw | ConvertFrom-Json
$data2 = Get-Content $data2File -Raw | ConvertFrom-Json

Write-Host "Baseline: $Profile1" -ForegroundColor Yellow
Write-Host "New:      $Profile2" -ForegroundColor Yellow
Write-Host ""

# Compare function
function Compare-TestResult {
    param($TestName, $Metric, $Value1, $Value2, $LowerIsBetter = $false)

    if (-not $Value1 -or -not $Value2) {
        return
    }

    $diff = $Value2 - $Value1
    $pct = [math]::Round(($diff / $Value1) * 100, 1)

    $better = if ($LowerIsBetter) { $diff -lt 0 } else { $diff -gt 0 }
    $color = if ($better) { "Green" } else { "Red" }
    $symbol = if ($better) { "✅" } else { "❌" }

    Write-Host "$TestName - $Metric" -ForegroundColor Cyan
    Write-Host "  Baseline: $Value1" -ForegroundColor Gray
    Write-Host "  New:      $Value2" -ForegroundColor Gray

    if ($diff -eq 0) {
        Write-Host "  Change:   No change" -ForegroundColor Yellow
    } else {
        $diffStr = if ($diff -gt 0) { "+$diff" } else { "$diff" }
        Write-Host "  Change:   $diffStr ($pct%) $symbol" -ForegroundColor $color
    }
    Write-Host ""
}

# A1 - Aim Speed (lower is better)
if ($data1.tests.A1 -and $data2.tests.A1) {
    Compare-TestResult "A1 Aim Speed" "Average ms/target" $data1.tests.A1.average $data2.tests.A1.average -LowerIsBetter $true
}

# A2 - Tiny Target Accuracy (higher is better)
if ($data1.tests.A2 -and $data2.tests.A2) {
    Compare-TestResult "A2 Tiny Target" "Average score" $data1.tests.A2.average $data2.tests.A2.average -LowerIsBetter $false
}

# R3 - Browser Polling
if ($data1.tests.R3 -and $data2.tests.R3) {
    Compare-TestResult "R3 Browser Rate" "Hz" $data1.tests.R3.hz $data2.tests.R3.hz -LowerIsBetter $false
}

# S1 - Scroll (lower overscrolls is better)
if ($data1.tests.S1 -and $data2.tests.S1) {
    Compare-TestResult "S1 Scroll" "Overscrolls" $data1.tests.S1.overscrolls $data2.tests.S1.overscrolls -LowerIsBetter $true
}

# P1 - Precision (higher is better)
if ($data1.tests.P1 -and $data2.tests.P1) {
    Compare-TestResult "P1 Precision" "Average level" $data1.tests.P1.average $data2.tests.P1.average -LowerIsBetter $false
}

# Office tasks (lower is better for time/misclicks/failures)
if ($data1.tests.O1 -and $data2.tests.O1) {
    if ($data1.tests.O1.time -and $data2.tests.O1.time) {
        Compare-TestResult "O1 Browser" "Time (s)" $data1.tests.O1.time $data2.tests.O1.time -LowerIsBetter $true
    }
    if ($data1.tests.O1.misclicks -and $data2.tests.O1.misclicks) {
        Compare-TestResult "O1 Browser" "Misclicks" $data1.tests.O1.misclicks $data2.tests.O1.misclicks -LowerIsBetter $true
    }
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Decision guide:" -ForegroundColor Yellow
Write-Host "  ✅ KEEP: Profile achieves goals, stop iterating" -ForegroundColor Green
Write-Host "  🔄 ITERATE: Small refinement needed, continue direction (P1→P2)" -ForegroundColor Cyan
Write-Host "  🔀 PIVOT: Wrong direction, try different approach (P1→P2-alt)" -ForegroundColor Magenta
Write-Host ""

# Generate report file
$reportFile = "results\comparison_${Profile1}_vs_${Profile2}.txt"
$reportContent = @"
Profile Comparison Report
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Baseline: $Profile1
New:      $Profile2

"@

# Add test comparisons to report
if ($data1.tests.A1 -and $data2.tests.A1) {
    $diff = $data2.tests.A1.average - $data1.tests.A1.average
    $reportContent += "A1 Aim Speed: $($data1.tests.A1.average)ms → $($data2.tests.A1.average)ms ($diff ms)`n"
}

if ($data1.tests.A2 -and $data2.tests.A2) {
    $diff = $data2.tests.A2.average - $data1.tests.A2.average
    $reportContent += "A2 Tiny Target: $($data1.tests.A2.average) → $($data2.tests.A2.average) ($diff)`n"
}

$reportContent | Set-Content $reportFile

Write-Host "Report saved to: $reportFile" -ForegroundColor Gray
Write-Host ""
