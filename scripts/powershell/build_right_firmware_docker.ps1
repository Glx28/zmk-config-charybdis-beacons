<#
Builds the right-half Charybdis firmware target in a ZMK Docker build image.
This avoids requiring west, CMake, Ninja, and Zephyr SDK on the Windows host.

Run from the project root:
  powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\powershell\build_right_firmware_docker.ps1

The script does not flash automatically. It copies the resulting UF2 to:
  firmware\charybdis_right_trackball.uf2
#>

[CmdletBinding()]
param(
    [string]$RepoRoot = "",
    [string]$Image = "zmkfirmware/zmk-build-arm:3.5-branch"
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($RepoRoot)) {
    $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}

$configRepo = Join-Path $RepoRoot "vendor\vzhao-zmk-for-charybdis-main-20250226"
$buildFirmwareDir = Join-Path $configRepo "firmware"
$publicFirmwareDir = Join-Path $RepoRoot "firmware"

if (-not (Test-Path -LiteralPath (Join-Path $configRepo "config\west.yml"))) {
    throw "Missing seller firmware config repo: $configRepo"
}

$docker = Get-Command docker -ErrorAction SilentlyContinue
if (-not $docker) {
    throw "Docker was not found on PATH."
}

New-Item -ItemType Directory -Force -Path $buildFirmwareDir | Out-Null
New-Item -ItemType Directory -Force -Path $publicFirmwareDir | Out-Null

$repoForDocker = ($configRepo -replace "\\", "/")
$script = @'
set -eux
cd /work
if [ ! -d .west ]; then
  west init -l config
fi
west update
west build -p -d /work/build/charybdis_right_trackball -s /work/zmk/app -b nice_nano_v2 -S studio-rpc-usb-uart -- -DSHIELD=charybdis_right -DCONFIG_ZMK_STUDIO=y -DZMK_CONFIG=/work/config -DZMK_EXTRA_MODULES=/work/zmk-pmw3610-driver -DZephyr_DIR=/work/zephyr/share/zephyr-package/cmake
cp /work/build/charybdis_right_trackball/zephyr/zmk.uf2 /work/firmware/charybdis_right_trackball.uf2
'@

docker run --rm `
    --workdir /work `
    --volume "${repoForDocker}:/work" `
    $Image `
    /bin/bash -lc $script

$uf2 = Join-Path $buildFirmwareDir "charybdis_right_trackball.uf2"
if (-not (Test-Path -LiteralPath $uf2)) {
    throw "Docker build finished without producing expected UF2: $uf2"
}

$publicUf2 = Join-Path $publicFirmwareDir "charybdis_right_trackball.uf2"
Copy-Item -LiteralPath $uf2 -Destination $publicUf2 -Force
Get-FileHash (Join-Path $publicFirmwareDir "*.uf2") -Algorithm SHA256 |
    ForEach-Object { "$($_.Hash)  $([IO.Path]::GetFileName($_.Path))" } |
    Set-Content -Encoding ascii (Join-Path $publicFirmwareDir "SHA256SUMS.txt")

Write-Host "Built right-half trackball firmware:" -ForegroundColor Green
Write-Host $publicUf2
Write-Host "Flash manually by putting the right half in bootloader mode and copying this UF2 to the mounted drive." -ForegroundColor Yellow
