# Interactive Benchmark Runner
# Guides you through all 5 tests, logs results to txt file

param(
    [Parameter(Mandatory=$true)]
    [string]$ProfileName
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Trackball Benchmark Runner V2" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Profile: $ProfileName" -ForegroundColor Yellow
Write-Host ""

# Find or create session folder
$sessionPattern = "results\${ProfileName}_*"
$sessionFolder = Get-ChildItem -Path $sessionPattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $sessionFolder) {
    Write-Host "Creating new session for $ProfileName..." -ForegroundColor Yellow
    & .\start_benchmark_session.ps1 -ProfileName $ProfileName
    $sessionFolder = Get-ChildItem -Path $sessionPattern -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1
}

Write-Host "Session folder: $($sessionFolder.Name)" -ForegroundColor Green
Write-Host ""

# Results file (simple text format)
$resultsFile = Join-Path $sessionFolder.FullName "benchmark_results.txt"

# Start results file
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
@"
TRACKBALL BENCHMARK RESULTS
===========================
Profile: $ProfileName
Date: $timestamp

CONFIG:
CPI: 600
Snipe CPI: 1600
XY Scaler: 2:1
Polling: 125_SW
Connection: Wireless

"@ | Set-Content $resultsFile

Write-Host "IMPORTANT:" -ForegroundColor Yellow
Write-Host "- Use same browser (100% zoom)" -ForegroundColor White
Write-Host "- Use same monitor" -ForegroundColor White
Write-Host "- Use same sitting position" -ForegroundColor White
Write-Host "- Warm up 3 minutes before starting" -ForegroundColor White
Write-Host ""

$warmup = Read-Host "Ready to start? (Press Enter after 3-min warmup)"

# TEST R1 - TestUFO Mouse Poll Rate
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST R1 - TestUFO Mouse Poll Rate" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://testufo.com/mouserate" -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor White
Write-Host "1. Open the link above" -ForegroundColor Gray
Write-Host "2. Click the test area" -ForegroundColor Gray
Write-Host "3. Move trackball VERY FAST in circles for 10 seconds" -ForegroundColor Gray
Write-Host "4. Note the peak Hz shown" -ForegroundColor Gray
Write-Host "5. Repeat 3 times" -ForegroundColor Gray
Write-Host ""
Write-Host "Expected result for 125_SW polling: 110-125 Hz" -ForegroundColor Yellow
Write-Host ""

$r1_1 = Read-Host "Run 1 peak Hz"
$r1_2 = Read-Host "Run 2 peak Hz"
$r1_3 = Read-Host "Run 3 peak Hz"

@"

R1 - TestUFO Mouse Poll Rate
-----------------------------
Run 1: $r1_1 Hz
Run 2: $r1_2 Hz
Run 3: $r1_3 Hz

"@ | Add-Content $resultsFile

Write-Host "✅ R1 logged" -ForegroundColor Green

# TEST A1 - Aim Trainer
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST A1 - Aim Trainer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://humanbenchmark.com/tests/aim" -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor White
Write-Host "1. Open the link above" -ForegroundColor Gray
Write-Host "2. Start the test" -ForegroundColor Gray
Write-Host "3. Click all 30 targets as fast as possible" -ForegroundColor Gray
Write-Host "4. Note the average ms/target shown" -ForegroundColor Gray
Write-Host "5. Repeat 3 times" -ForegroundColor Gray
Write-Host ""
Write-Host "What it measures: Target acquisition speed (lower is better)" -ForegroundColor Yellow
Write-Host ""

$a1_1 = Read-Host "Run 1 average ms/target"
$a1_2 = Read-Host "Run 2 average ms/target"
$a1_3 = Read-Host "Run 3 average ms/target"

@"

A1 - Aim Trainer
----------------
Run 1: $a1_1 ms/target
Run 2: $a1_2 ms/target
Run 3: $a1_3 ms/target

"@ | Add-Content $resultsFile

Write-Host "✅ A1 logged" -ForegroundColor Green

# TEST A2 - MouseAccuracy Classic
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST A2 - MouseAccuracy Classic (CRITICAL)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://mouseaccuracy.com/classic/" -ForegroundColor Yellow
Write-Host ""
Write-Host "SETTINGS:" -ForegroundColor White
Write-Host "- Target Size: TINY" -ForegroundColor Yellow
Write-Host "- Target Spawn Speed: Normal" -ForegroundColor Yellow
Write-Host "- Duration: 30s (if available)" -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor White
Write-Host "1. Open the link above" -ForegroundColor Gray
Write-Host "2. Set Target Size to TINY" -ForegroundColor Gray
Write-Host "3. Set Spawn Speed to Normal" -ForegroundColor Gray
Write-Host "4. Start the test" -ForegroundColor Gray
Write-Host "5. Click targets accurately" -ForegroundColor Gray
Write-Host "6. Note: Score, Targets Clicked, Misclicks" -ForegroundColor Gray
Write-Host "7. Repeat 5 times" -ForegroundColor Gray
Write-Host ""
Write-Host "What it measures: Tiny-target precision (higher score, lower misclicks is better)" -ForegroundColor Yellow
Write-Host "This is the MOST IMPORTANT test for your overshoot problem" -ForegroundColor Red
Write-Host ""

Write-Host "For each run, enter: score targets misclicks (space-separated)" -ForegroundColor White
Write-Host "Example: 125 42 3" -ForegroundColor Gray
Write-Host ""

$a2_1 = Read-Host "Run 1"
$a2_2 = Read-Host "Run 2"
$a2_3 = Read-Host "Run 3"
$a2_4 = Read-Host "Run 4"
$a2_5 = Read-Host "Run 5"

@"

A2 - MouseAccuracy Classic (Tiny Targets, 30s)
-----------------------------------------------
Run 1: $a2_1
Run 2: $a2_2
Run 3: $a2_3
Run 4: $a2_4
Run 5: $a2_5

"@ | Add-Content $resultsFile

Write-Host "✅ A2 logged" -ForegroundColor Green

# TEST P1 - Mouse Precision Movement
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST P1 - Mouse Precision Movement" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://mousetest.online/precision-movement/" -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor White
Write-Host "1. Open the link above" -ForegroundColor Gray
Write-Host "2. Place cursor at left side of dashed line" -ForegroundColor Gray
Write-Host "3. Trace the line left-to-right in ONE SMOOTH movement" -ForegroundColor Gray
Write-Host "4. Do NOT stop and correct repeatedly" -ForegroundColor Gray
Write-Host "5. Do NOT rush" -ForegroundColor Gray
Write-Host "6. Note: Precision Score %, Avg Jitter px, Max Jitter px, Points" -ForegroundColor Gray
Write-Host "7. Reset and repeat 5 times" -ForegroundColor Gray
Write-Host ""
Write-Host "What it measures: Straight-line path cleanliness (higher precision, lower jitter is better)" -ForegroundColor Yellow
Write-Host ""

Write-Host "For each run, enter: precision% avgJitter maxJitter points (space-separated)" -ForegroundColor White
Write-Host "Example: 86.5 5.2 28 450" -ForegroundColor Gray
Write-Host ""

$p1_1 = Read-Host "Run 1"
$p1_2 = Read-Host "Run 2"
$p1_3 = Read-Host "Run 3"
$p1_4 = Read-Host "Run 4"
$p1_5 = Read-Host "Run 5"

@"

P1 - Mouse Precision Movement
------------------------------
Run 1: $p1_1
Run 2: $p1_2
Run 3: $p1_3
Run 4: $p1_4
Run 5: $p1_5

"@ | Add-Content $resultsFile

Write-Host "✅ P1 logged" -ForegroundColor Green

# TEST P2 - XbitLabs Mouse Accuracy
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST P2 - XbitLabs Mouse Accuracy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Link: https://www.xbitlabs.com/mouse-accuracy-test/" -ForegroundColor Yellow
Write-Host ""
Write-Host "SETTINGS:" -ForegroundColor White
Write-Host "- Difficulty: MEDIUM for all modes" -ForegroundColor Yellow
Write-Host "- Use same path type every time" -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCTIONS:" -ForegroundColor White
Write-Host "You will run 4 different modes, 3 times each (12 total runs)" -ForegroundColor Gray
Write-Host "For each run, note: Accuracy%, Deviation px, Failures" -ForegroundColor Gray
Write-Host ""
Write-Host "What it measures: Curved paths, shapes, steady hand (complements P1)" -ForegroundColor Yellow
Write-Host "This catches problems that don't show up in straight-line tests" -ForegroundColor Red
Write-Host ""

# P2 Mode 1: Path Follow
Write-Host ""
Write-Host "[P2.1] Path Follow Mode (3 runs)" -ForegroundColor Cyan
Write-Host "For each run, enter: accuracy% deviation failures (space-separated)" -ForegroundColor White
Write-Host "Example: 85.2 12.5 2" -ForegroundColor Gray
Write-Host ""

$p2_path_1 = Read-Host "Path Follow Run 1"
$p2_path_2 = Read-Host "Path Follow Run 2"
$p2_path_3 = Read-Host "Path Follow Run 3"

# P2 Mode 2: Shape Trace
Write-Host ""
Write-Host "[P2.2] Shape Trace Mode (3 runs)" -ForegroundColor Cyan
Write-Host "For each run, enter: accuracy% deviation failures (space-separated)" -ForegroundColor White
Write-Host ""

$p2_shape_1 = Read-Host "Shape Trace Run 1"
$p2_shape_2 = Read-Host "Shape Trace Run 2"
$p2_shape_3 = Read-Host "Shape Trace Run 3"

# P2 Mode 3: Steady Hand
Write-Host ""
Write-Host "[P2.3] Steady Hand Mode (3 runs)" -ForegroundColor Cyan
Write-Host "For each run, enter: accuracy% deviation failures (space-separated)" -ForegroundColor White
Write-Host ""

$p2_steady_1 = Read-Host "Steady Hand Run 1"
$p2_steady_2 = Read-Host "Steady Hand Run 2"
$p2_steady_3 = Read-Host "Steady Hand Run 3"

# P2 Mode 4: Precision
Write-Host ""
Write-Host "[P2.4] Precision Mode (3 runs)" -ForegroundColor Cyan
Write-Host "For each run, enter: accuracy% deviation failures (space-separated)" -ForegroundColor White
Write-Host ""

$p2_prec_1 = Read-Host "Precision Run 1"
$p2_prec_2 = Read-Host "Precision Run 2"
$p2_prec_3 = Read-Host "Precision Run 3"

@"

P2 - XbitLabs Mouse Accuracy
-----------------------------
Path Follow (Medium):
  Run 1: $p2_path_1
  Run 2: $p2_path_2
  Run 3: $p2_path_3

Shape Trace (Medium):
  Run 1: $p2_shape_1
  Run 2: $p2_shape_2
  Run 3: $p2_shape_3

Steady Hand (Medium):
  Run 1: $p2_steady_1
  Run 2: $p2_steady_2
  Run 3: $p2_steady_3

Precision (Medium):
  Run 1: $p2_prec_1
  Run 2: $p2_prec_2
  Run 3: $p2_prec_3

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
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Paste this file to AI for analysis" -ForegroundColor Cyan
Write-Host "  2. AI will suggest firmware changes" -ForegroundColor Cyan
Write-Host "  3. Build and flash new firmware" -ForegroundColor Cyan
Write-Host "  4. Run this script again with new profile name" -ForegroundColor Cyan
Write-Host "  5. AI will compare and recommend next iteration" -ForegroundColor Cyan
Write-Host ""
