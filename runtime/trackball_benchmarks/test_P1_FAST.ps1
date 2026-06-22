# Fast P1 Testing (20-25 min)
# Tests only what matters for CPI change

param(
    [string]$ProfileName = "P1-CPI300"
)

$resultsFile = "results\${ProfileName}_results.txt"

Write-Host "====================" -ForegroundColor Cyan
Write-Host "P1 Fast Test (20 min)" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Profile: $ProfileName" -ForegroundColor Yellow
Write-Host "Change: CPI 600 → 300" -ForegroundColor Yellow
Write-Host ""

@"
P1 TEST RESULTS
===============
Profile: $ProfileName
Config: CPI 300, XY Scaler 2:1, Polling 125_SW
Date: $(Get-Date -Format "yyyy-MM-dd HH:mm")

"@ | Set-Content $resultsFile

# Test 1: A1 Aim Trainer (3 runs, ~10 min)
Write-Host "[1/4] A1 - Aim Trainer" -ForegroundColor Cyan
Write-Host "Link: https://humanbenchmark.com/tests/aim" -ForegroundColor Yellow
Write-Host "Do 3 runs, paste ms/target for each" -ForegroundColor White
Write-Host ""

$a1_1 = Read-Host "Run 1 ms/target"
$a1_2 = Read-Host "Run 2 ms/target"
$a1_3 = Read-Host "Run 3 ms/target"

@"

A1 - Aim Trainer
----------------
Run 1: $a1_1 ms
Run 2: $a1_2 ms
Run 3: $a1_3 ms

"@ | Add-Content $resultsFile

# Test 2: A2 MouseAccuracy (3 runs, ~10 min)
Write-Host ""
Write-Host "[2/4] A2 - MouseAccuracy Classic" -ForegroundColor Cyan
Write-Host "Link: https://mouseaccuracy.com/classic/" -ForegroundColor Yellow
Write-Host "Settings: MEDIUM targets, Normal speed" -ForegroundColor Yellow
Write-Host "Do 3 runs, paste 'clicks misclicks' for each" -ForegroundColor White
Write-Host "Example: 8 2" -ForegroundColor Gray
Write-Host ""

$a2_1 = Read-Host "Run 1"
$a2_2 = Read-Host "Run 2"
$a2_3 = Read-Host "Run 3"

@"

A2 - MouseAccuracy Classic (MEDIUM targets)
--------------------------------------------
Run 1: $a2_1
Run 2: $a2_2
Run 3: $a2_3

"@ | Add-Content $resultsFile

# Test 3: P1 Precision Movement (1 run, ~3 min)
Write-Host ""
Write-Host "[3/4] P1 - Precision Movement" -ForegroundColor Cyan
Write-Host "Link: https://mousetest.online/precision-movement/" -ForegroundColor Yellow
Write-Host "Do 1 run, paste the entire result block" -ForegroundColor White
Write-Host ""

Write-Host "Paste result (Ctrl+V, then press Enter twice):" -ForegroundColor White
$p1_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p1_lines += $line
}

@"

P1 - Precision Movement
-----------------------
$($p1_lines -join "`n")

"@ | Add-Content $resultsFile

# Test 4: P2 XbitLabs (1 mode, 3 runs, ~10 min)
Write-Host ""
Write-Host "[4/4] P2 - XbitLabs (Path Follow only)" -ForegroundColor Cyan
Write-Host "Link: https://www.xbitlabs.com/mouse-accuracy-test/" -ForegroundColor Yellow
Write-Host "Mode: Path Follow, Medium difficulty" -ForegroundColor Yellow
Write-Host "Do 3 runs, paste stats block for each" -ForegroundColor White
Write-Host ""

Write-Host "Run 1 - Paste stats block (Enter twice when done):" -ForegroundColor White
$p2_1_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_1_lines += $line
}

Write-Host "Run 2 - Paste stats block:" -ForegroundColor White
$p2_2_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_2_lines += $line
}

Write-Host "Run 3 - Paste stats block:" -ForegroundColor White
$p2_3_lines = @()
while ($true) {
    $line = Read-Host
    if ([string]::IsNullOrWhiteSpace($line)) { break }
    $p2_3_lines += $line
}

@"

P2 - XbitLabs Path Follow (Medium)
-----------------------------------
Run 1:
$($p2_1_lines -join "`n")

Run 2:
$($p2_2_lines -join "`n")

Run 3:
$($p2_3_lines -join "`n")

"@ | Add-Content $resultsFile

Write-Host ""
Write-Host "✅ P1 testing complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Results saved to: $resultsFile" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next: Paste this file to AI for P0 vs P1 comparison" -ForegroundColor Cyan
