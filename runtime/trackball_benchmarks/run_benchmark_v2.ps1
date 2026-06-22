# Trackball Benchmark V2 - Updated Script
# Based on user feedback: simplified, realistic test times

param(
    [Parameter(Mandatory=$true)]
    [string]$ProfileName
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Trackball Benchmark V2" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Profile: $ProfileName" -ForegroundColor Yellow
Write-Host "Estimated time: 20-25 minutes" -ForegroundColor Gray
Write-Host ""

# Find or create session folder
$sessionPattern = "results\${ProfileName}_*"
$sessionFolder = Get-ChildItem -Path $sessionPattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $sessionFolder) {
    Write-Host "Creating new session..." -ForegroundColor Yellow
    & .\start_benchmark_session.ps1 -ProfileName $ProfileName
    $sessionFolder = Get-ChildItem -Path $sessionPattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
}

$resultsFile = Join-Path $sessionFolder.FullName "benchmark_results.txt"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

@"
TRACKBALL BENCHMARK RESULTS V2
==============================
Profile: $ProfileName
Date: $timestamp

"@ | Set-Content $resultsFile

Write-Host "Results will be saved to:" -ForegroundColor White
Write-Host "  $resultsFile" -ForegroundColor Yellow
Write-Host ""

# TEST R1 - TestUFO (1 run only)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST R1 - TestUFO Mouse Poll Rate" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://testufo.com/mouserate" -ForegroundColor Yellow
Write-Host ""
Write-Host "Instructions:" -ForegroundColor White
Write-Host "1. Click the test area" -ForegroundColor Gray
Write-Host "2. Move trackball VERY FAST in circles for 10 seconds" -ForegroundColor Gray
Write-Host "3. Note the peak Hz shown" -ForegroundColor Gray
Write-Host ""
Write-Host "Expected: 110-125 Hz for 125_SW polling" -ForegroundColor Yellow
Write-Host ""

$r1 = Read-Host "Peak Hz"

@"

R1 - TestUFO Mouse Poll Rate
-----------------------------
Peak Hz: $r1

"@ | Add-Content $resultsFile

Write-Host "✅ R1 logged" -ForegroundColor Green

# TEST A1 - Aim Trainer (3 runs)
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST A1 - Aim Trainer (3 runs)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://humanbenchmark.com/tests/aim" -ForegroundColor Yellow
Write-Host ""
Write-Host "Instructions:" -ForegroundColor White
Write-Host "1. Click Start" -ForegroundColor Gray
Write-Host "2. Click all 30 targets as fast as possible" -ForegroundColor Gray
Write-Host "3. Note 'Average time per target' at the end" -ForegroundColor Gray
Write-Host "4. Repeat 3 times" -ForegroundColor Gray
Write-Host ""

$a1_1 = Read-Host "Run 1 ms/target"
$a1_2 = Read-Host "Run 2 ms/target"
$a1_3 = Read-Host "Run 3 ms/target"

@"

A1 - Aim Trainer
----------------
Run 1: $a1_1 ms/target
Run 2: $a1_2 ms/target
Run 3: $a1_3 ms/target

"@ | Add-Content $resultsFile

Write-Host "✅ A1 logged" -ForegroundColor Green

# TEST A2 - MouseAccuracy (3 runs, MEDIUM targets)
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST A2 - MouseAccuracy Classic (3 runs)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://mouseaccuracy.com/classic/" -ForegroundColor Yellow
Write-Host ""
Write-Host "SETTINGS:" -ForegroundColor Yellow
Write-Host "- Target Size: MEDIUM" -ForegroundColor White
Write-Host "- Spawn Speed: Normal" -ForegroundColor White
Write-Host ""
Write-Host "Instructions:" -ForegroundColor White
Write-Host "1. Set target size to MEDIUM" -ForegroundColor Gray
Write-Host "2. Start test" -ForegroundColor Gray
Write-Host "3. At the end, note:" -ForegroundColor Gray
Write-Host "   - 'You clicked X targets'" -ForegroundColor Gray
Write-Host "   - 'You misclicked Y times'" -ForegroundColor Gray
Write-Host "4. Repeat 3 times" -ForegroundColor Gray
Write-Host ""
Write-Host "Format: Enter as 'clicks misclicks'" -ForegroundColor Yellow
Write-Host "Example: 8 2" -ForegroundColor Gray
Write-Host ""

$a2_1 = Read-Host "Run 1 (clicks misclicks)"
$a2_2 = Read-Host "Run 2 (clicks misclicks)"
$a2_3 = Read-Host "Run 3 (clicks misclicks)"

@"

A2 - MouseAccuracy Classic (MEDIUM targets, Normal speed)
----------------------------------------------------------
Run 1: $a2_1
Run 2: $a2_2
Run 3: $a2_3

"@ | Add-Content $resultsFile

Write-Host "✅ A2 logged" -ForegroundColor Green

# TEST P1 - Precision Movement (3 runs, paste full block)
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST P1 - Mouse Precision Movement (3 runs)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://mousetest.online/precision-movement/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Instructions:" -ForegroundColor White
Write-Host "1. Trace the dashed line left-to-right smoothly" -ForegroundColor Gray
Write-Host "2. Copy the ENTIRE result block shown on screen" -ForegroundColor Gray
Write-Host "3. Paste it here" -ForegroundColor Gray
Write-Host "4. Repeat 3 times" -ForegroundColor Gray
Write-Host ""

Write-Host "Run 1 - Paste entire stats block, then press Enter twice:" -ForegroundColor Yellow
$p1_1_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p1_1_lines += $line
}

Write-Host "Run 2 - Paste entire stats block, then press Enter twice:" -ForegroundColor Yellow
$p1_2_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p1_2_lines += $line
}

Write-Host "Run 3 - Paste entire stats block, then press Enter twice:" -ForegroundColor Yellow
$p1_3_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p1_3_lines += $line
}

@"

P1 - Mouse Precision Movement
------------------------------
Run 1:
$($p1_1_lines -join "`n")

Run 2:
$($p1_2_lines -join "`n")

Run 3:
$($p1_3_lines -join "`n")

"@ | Add-Content $resultsFile

Write-Host "✅ P1 logged" -ForegroundColor Green

# TEST P2 - XbitLabs (3 runs, one mode only)
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST P2 - XbitLabs Path Follow (3 runs)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://www.xbitlabs.com/mouse-accuracy-test/" -ForegroundColor Yellow
Write-Host ""
Write-Host "SETTINGS:" -ForegroundColor Yellow
Write-Host "- Mode: Path Follow" -ForegroundColor White
Write-Host "- Difficulty: Medium" -ForegroundColor White
Write-Host ""
Write-Host "Instructions:" -ForegroundColor White
Write-Host "1. Select Path Follow mode" -ForegroundColor Gray
Write-Host "2. Set difficulty to Medium" -ForegroundColor Gray
Write-Host "3. Complete the test" -ForegroundColor Gray
Write-Host "4. Copy the Statistics block shown" -ForegroundColor Gray
Write-Host "5. Paste it here" -ForegroundColor Gray
Write-Host "6. Repeat 3 times" -ForegroundColor Gray
Write-Host ""

Write-Host "Run 1 - Paste stats block, then press Enter twice:" -ForegroundColor Yellow
$p2_1_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_1_lines += $line
}

Write-Host "Run 2 - Paste stats block, then press Enter twice:" -ForegroundColor Yellow
$p2_2_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_2_lines += $line
}

Write-Host "Run 3 - Paste stats block, then press Enter twice:" -ForegroundColor Yellow
$p2_3_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_3_lines += $line
}

@"

P2 - XbitLabs Path Follow (Medium difficulty)
----------------------------------------------
Run 1:
$($p2_1_lines -join "`n")

Run 2:
$($p2_2_lines -join "`n")

Run 3:
$($p2_3_lines -join "`n")

"@ | Add-Content $resultsFile

Write-Host "✅ P2 logged" -ForegroundColor Green

# Done
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "BENCHMARK COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Results saved to:" -ForegroundColor White
Write-Host "  $resultsFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next: Paste the entire file contents to AI for analysis" -ForegroundColor Cyan
Write-Host ""
