# Push firmware / layout / script changes and trigger fresh GitHub build.
# Run after firmware review and apply script improvements.
# Enforces protocol: right-half focus for trackball, backups assumed done.
#
# Usage:
#   .\scripts\powershell\push_firmware_build.ps1 -Message "P3 150 baseline + L1 scroll ease + apply script accuracy + firmware review fixes"
#
# It will:
# - Show git status for relevant paths.
# - Add common files (right.conf, keymap, overlay, apply scripts, new automation, docs, state).
# - Commit + push (starts GH Actions matrix for charybdis_right etc.).
# - Remind to download artifact, use prepare + auto watcher or manual flash when bootloader connected.

param(
    [string]$Message = "Firmware review + layout improvements + apply accuracy + automation updates"
)

$repoRoot = (Resolve-Path .).Path
$relevant = @(
    "zmk-config-charybdis-beacons/config/boards/shields/charybdis/charybdis_right.conf",
    "zmk-config-charybdis-beacons/config/boards/shields/charybdis/charybdis_right.overlay",
    "zmk-config-charybdis-beacons/config/charybdis.keymap",
    "zmk-config-charybdis-beacons/config/coach_beacon_macros.keymap.dtsi",
    "scripts/zmk-studio/apply_every_key.js",
    "scripts/zmk-studio/verify_every_key.js",
    "scripts/powershell/auto_flash_watcher.ps1",
    "scripts/powershell/push_firmware_build.ps1",
    "scripts/powershell/prepare_flash_right.ps1",
    "layout/keybindings_explained.csv",
    "runtime/PROJECT_STATE.md",
    "docs/ADD_BEACONS_GUIDE.md",
    "zmk-config-charybdis-beacons/config/trackball_tuning.md"
)

Write-Host "=== Charybdis Push + Fresh Build ===" -ForegroundColor Cyan
Write-Host "This will commit and push changes to trigger GitHub Actions (right build)."
Write-Host "Review the diff first!"

git status --short

$toAdd = @()
foreach ($p in $relevant) {
    if (Test-Path $p) {
        git add $p
        $toAdd += $p
    }
}

if ($toAdd.Count -eq 0) {
    Write-Host "No relevant changes staged. Aborting." -ForegroundColor Yellow
    exit 1
}

Write-Host "`nStaged for commit:" -ForegroundColor Green
$toAdd | ForEach-Object { Write-Host "  $_" }

$fullMsg = @"
$Message

- Auto flash watcher (bootloader connect)
- Firmware review fixes + notes (dup SPI, input procs, etc.)
- apply_every_key.js accuracy hardening (no skips, coach/scroll/L1 support, verify enforcement)
- Updated layout (direct nav scroll toggle) + state/docs
"@

git commit -m $fullMsg

if ($LASTEXITCODE -eq 0) {
    git push
    Write-Host "`nPushed. Check https://github.com/Glx28/zmk-config-charybdis-beacons/actions for new build (P3/right)." -ForegroundColor Green
    Write-Host "After build succeeds: download right artifact, use prepare_flash_right.ps1, then plug board in bootloader for auto (or manual) flash." -ForegroundColor Cyan
} else {
    Write-Host "Commit/push failed. Check git output." -ForegroundColor Red
}