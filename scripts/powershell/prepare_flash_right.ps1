# Prepare and verify right-half firmware for flashing (P3 or other profiles)
# Usage: Run after downloading artifact from GitHub Actions
# 1. Download the artifact zip from the desired build (e.g. the P3 CPI 150 run)
# 2. Extract the right .uf2
# 3. Run this script with the path to the new UF2

param(
    [string]$NewRightUF2 = ""
)

$fwDir = "firmware"
$backupDir = "firmware\backups"

Write-Host "=== Charybdis Right Half Flash Prep ===" -ForegroundColor Cyan

if (-not (Test-Path $fwDir)) { New-Item -ItemType Directory -Path $fwDir | Out-Null }

if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir | Out-Null }

Write-Host "`nCurrent right UF2 files:" -ForegroundColor Yellow
Get-ChildItem $fwDir\*right*.uf2 | Select Name, LastWriteTime | Format-Table

if ($NewRightUF2 -and (Test-Path $NewRightUF2)) {
    $destName = "charybdis_right_trackball_$(Get-Date -Format 'yyyyMMdd_HHmm').uf2"
    $dest = Join-Path $fwDir $destName

    Write-Host "`nCopying new firmware to $dest ..." -ForegroundColor Green
    Copy-Item $NewRightUF2 $dest -Force

    # Backup current active one
    $current = Join-Path $fwDir "charybdis_right_trackball.uf2"
    if (Test-Path $current) {
        $backupName = "charybdis_right_trackball_$(Get-Date -Format 'yyyyMMdd_HHmm')_PREFLASH.uf2"
        $backupPath = Join-Path $backupDir $backupName
        Copy-Item $current $backupPath -Force
        Write-Host "Backed up current to $backupPath" -ForegroundColor Green
    }

    Write-Host "`nNew firmware staged as: $dest" -ForegroundColor Cyan
    Write-Host "To flash (right half ONLY):" -ForegroundColor Yellow
    Write-Host "1. Put right half into bootloader (tap reset twice quickly or use button combo)"
    Write-Host "2. Copy $dest to the NICEBOOT drive that appears"
    Write-Host "3. Wait for it to finish (LEDs, etc.)"
    Write-Host "4. Reconnect and test basic keys + trackball"
    Write-Host "5. Then run the benchmark: cd runtime/trackball_benchmarks; .\run_benchmark.ps1 -ProfileName 'P3-150-newbuild' ..."

} else {
    Write-Host "`nNo new UF2 provided or file not found." -ForegroundColor Yellow
    Write-Host "Steps for you:" -ForegroundColor White
    Write-Host "1. Go to https://github.com/Glx28/zmk-config-charybdis-beacons/actions"
    Write-Host "2. Find the build titled 'P3: CPI 150, speed mode 1000' (Build #28 or similar)"
    Write-Host "3. Open the run -> Artifacts -> download the zip with right firmware"
    Write-Host "4. Extract the .uf2 (usually nice_nano_v2-charybdis_right*.uf2)"
    Write-Host "5. Re-run this script with the path: .\scripts\powershell\prepare_flash_right.ps1 -NewRightUF2 'C:\path\to\extracted.uf2'"
}

Write-Host "`nIMPORTANT: Flash RIGHT HALF ONLY for trackball changes. Never flash left for CPI." -ForegroundColor Red
Write-Host "Always keep at least one working backup UF2." -ForegroundColor Yellow
Write-Host "For auto-flash when you plug in bootloader mode: run the watcher script in another window." -ForegroundColor Cyan
