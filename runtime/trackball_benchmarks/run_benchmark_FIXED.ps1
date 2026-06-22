# Trackball Benchmark - FIXED VERSION
# 4 tests: R1, A1, A2, P2 (XbitLabs)
# Total time: ~20 minutes

param(
    [Parameter(Mandatory=$true)]
    [string]$ProfileName
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Trackball Benchmark" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Profile: $ProfileName" -ForegroundColor Yellow
Write-Host "Tests: R1, A1, A2, P2" -ForegroundColor Gray
Write-Host "Time: ~20 minutes" -ForegroundColor Gray
Write-Host ""

# Find or create session
$sessionPattern = "results\${ProfileName}_*"
$sessionFolder = Get-ChildItem -Path $sessionPattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $sessionFolder) {
    & .\start_benchmark_session.ps1 -ProfileName $ProfileName
    $sessionFolder = Get-ChildItem -Path $sessionPattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
}

$resultsFile = Join-Path $sessionFolder.FullName "benchmark_results.txt"

@"
TRACKBALL BENCHMARK RESULTS
===========================
Profile: $ProfileName
Date: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

"@ | Set-Content $resultsFile

# R1 - TestUFO (1 run)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[1/4] R1 - TestUFO Mouse Poll Rate" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "https://testufo.com/mouserate" -ForegroundColor Yellow
Write-Host ""
Write-Host "Move trackball FAST in circles for 10s, note peak Hz" -ForegroundColor White
Write-Host ""

$r1 = Read-Host "Peak Hz"

"R1 - TestUFO`nPeak Hz: $r1`n" | Add-Content $resultsFile
Write-Host "✅ Logged`n" -ForegroundColor Green

# A1 - Aim Trainer (3 runs)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[2/4] A1 - Aim Trainer (3 runs)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "https://humanbenchmark.com/tests/aim" -ForegroundColor Yellow
Write-Host ""
Write-Host "Click 30 targets, note 'Average time per target'" -ForegroundColor White
Write-Host "Do 3 runs" -ForegroundColor White
Write-Host ""

$a1_1 = Read-Host "Run 1 ms/target"
$a1_2 = Read-Host "Run 2 ms/target"
$a1_3 = Read-Host "Run 3 ms/target"

"A1 - Aim Trainer`nRun 1: $a1_1 ms`nRun 2: $a1_2 ms`nRun 3: $a1_3 ms`n" | Add-Content $resultsFile
Write-Host "✅ Logged`n" -ForegroundColor Green

# A2 - MouseAccuracy (3 runs, MEDIUM)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[3/4] A2 - MouseAccuracy (3 runs)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "https://mouseaccuracy.com/classic/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Settings: MEDIUM targets, Normal speed" -ForegroundColor Yellow
Write-Host ""
Write-Host "Note at end: 'You clicked X targets' and 'You misclicked Y times'" -ForegroundColor White
Write-Host "Enter as: clicks misclicks (e.g., 8 3)" -ForegroundColor White
Write-Host "Do 3 runs" -ForegroundColor White
Write-Host ""

$a2_1 = Read-Host "Run 1 (clicks misclicks)"
$a2_2 = Read-Host "Run 2 (clicks misclicks)"
$a2_3 = Read-Host "Run 3 (clicks misclicks)"

"A2 - MouseAccuracy (MEDIUM targets)`nRun 1: $a2_1`nRun 2: $a2_2`nRun 3: $a2_3`n" | Add-Content $resultsFile
Write-Host "✅ Logged`n" -ForegroundColor Green

# P2 - XbitLabs (3 runs)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "[4/4] P2 - XbitLabs Path Follow (3 runs)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "https://www.xbitlabs.com/mouse-accuracy-test/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Mode: Path Follow, Difficulty: Medium" -ForegroundColor Yellow
Write-Host ""
Write-Host "Paste the entire Statistics block after each run" -ForegroundColor White
Write-Host "Press Enter twice when done pasting" -ForegroundColor White
Write-Host ""

Write-Host "Run 1 - Paste stats:" -ForegroundColor Cyan
$p2_1 = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_1 += $line
}

Write-Host "Run 2 - Paste stats:" -ForegroundColor Cyan
$p2_2 = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_2 += $line
}

Write-Host "Run 3 - Paste stats:" -ForegroundColor Cyan
$p2_3 = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_3 += $line
}

@"
P2 - XbitLabs Path Follow (Medium)
-----------------------------------
Run 1:
$($p2_1 -join "`n")

Run 2:
$($p2_2 -join "`n")

Run 3:
$($p2_3 -join "`n")

"@ | Add-Content $resultsFile

Write-Host "✅ Logged`n" -ForegroundColor Green

# Subjective Feedback
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Subjective Feedback" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "How did this profile feel overall?" -ForegroundColor Yellow
Write-Host "Was it better/worse than before?" -ForegroundColor Yellow
Write-Host "Any specific issues?" -ForegroundColor Yellow
Write-Host ""

$feedback = Read-Host "Your feedback"

"`nUSER FEEDBACK:`n$feedback`n" | Add-Content $resultsFile

# Done
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Saved to: $resultsFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "Paste file contents to AI for analysis" -ForegroundColor Cyan
Write-Host ""
