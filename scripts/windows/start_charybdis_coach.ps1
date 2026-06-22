<#
Start the USB-first Charybdis web coach with live layer monitoring.

Run from the repo root:
  powershell -ExecutionPolicy Bypass -File .\scripts\windows\start_charybdis_coach.ps1

This script:
- Starts the USB state monitor (reads keyboard state over serial).
- Starts a local static web server on 127.0.0.1.
- Opens the modern coach app with live layer switching.

Note: Bluetooth beacon version is WIP. USB is the primary implementation.
#>

[CmdletBinding()]
param(
    [string]$RepoRoot = "",
    [int]$Port = 0,
    [switch]$NoBrowser
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($RepoRoot)) {
    $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\")).Path
}

$helperConfigPath = Join-Path $RepoRoot "config\charybdis_helper.json"
$coachIndexPath = Join-Path $RepoRoot "apps\charybdis-coach\index.html"
$runtimeDir = Join-Path $RepoRoot "runtime"
$pidPath = Join-Path $runtimeDir "charybdis_coach_server.pid"

if (-not (Test-Path -LiteralPath $helperConfigPath)) {
    throw "Missing helper config: $helperConfigPath"
}
if (-not (Test-Path -LiteralPath $coachIndexPath)) {
    throw "Missing coach app: $coachIndexPath"
}
if (-not (Test-Path -LiteralPath $runtimeDir)) {
    New-Item -ItemType Directory -Path $runtimeDir | Out-Null
}

$helperConfig = Get-Content -Raw -Encoding UTF8 -LiteralPath $helperConfigPath | ConvertFrom-Json
if ($Port -le 0) {
    $Port = if ($helperConfig.coach_server_port) { [int]$helperConfig.coach_server_port } else { 8765 }
}

function Test-LocalPort {
    param([int]$Port)
    try {
        $client = [Net.Sockets.TcpClient]::new()
        $task = $client.ConnectAsync("127.0.0.1", $Port)
        if (-not $task.Wait(250)) {
            $client.Dispose()
            return $false
        }
        $connected = $client.Connected
        $client.Dispose()
        return $connected
    } catch {
        return $false
    }
}

function Find-Python {
    foreach ($name in @("python", "python3", "py")) {
        $cmd = Get-Command $name -ErrorAction SilentlyContinue
        if ($cmd) {
            return $cmd.Source
        }
    }
    return $null
}

# Start USB state monitor
$monitorScript = Join-Path $RepoRoot "scripts\windows\usb_state_monitor.py"
$monitorPidPath = Join-Path $runtimeDir "usb_monitor.pid"

# Check if monitor is already running
$monitorRunning = $false
if (Test-Path $monitorPidPath) {
    $oldPid = Get-Content $monitorPidPath -ErrorAction SilentlyContinue
    if ($oldPid -and (Get-Process -Id $oldPid -ErrorAction SilentlyContinue)) {
        Write-Host "USB monitor already running (PID $oldPid)" -ForegroundColor Green
        $monitorRunning = $true
    }
}

if (-not $monitorRunning) {
    $python = Find-Python
    if ($python) {
        try {
            # Install pyserial if needed
            & $python -m pip install --quiet pyserial 2>&1 | Out-Null
        } catch {
            Write-Warning "Could not install pyserial. USB monitor may not work."
        }

        # Start monitor in background
        $monitorProcess = Start-Process -FilePath $python -ArgumentList @($monitorScript) -WorkingDirectory $RepoRoot -WindowStyle Hidden -PassThru
        Set-Content -LiteralPath $monitorPidPath -Value $monitorProcess.Id -Encoding ASCII
        Write-Host "USB state monitor started (PID $($monitorProcess.Id))" -ForegroundColor Green
        Start-Sleep -Milliseconds 500
    } else {
        Write-Warning "Python not found. USB live monitor will not run. Coach will work in static mode."
    }
}

if (Test-LocalPort -Port $Port) {
    Write-Host "Coach server already listening on http://127.0.0.1:$Port" -ForegroundColor Green
} else {
    $python = Find-Python
    if (-not $python) {
        throw "Python was not found. Install Python or start a static server from the repo root on port $Port."
    }

    $name = Split-Path -Leaf $python
    if ($name -ieq "py.exe" -or $name -ieq "py") {
        $arguments = @("-3", "-m", "http.server", "$Port", "--bind", "127.0.0.1")
    } else {
        $arguments = @("-m", "http.server", "$Port", "--bind", "127.0.0.1")
    }

    $server = Start-Process -FilePath $python -ArgumentList $arguments -WorkingDirectory $RepoRoot -WindowStyle Hidden -PassThru
    Set-Content -LiteralPath $pidPath -Value $server.Id -Encoding ASCII
    Start-Sleep -Milliseconds 700

    if (-not (Test-LocalPort -Port $Port)) {
        throw "Coach server did not start on http://127.0.0.1:$Port"
    }
    Write-Host "Coach server started on http://127.0.0.1:$Port (PID $($server.Id))." -ForegroundColor Green
}

$url = "http://127.0.0.1:$Port/apps/charybdis-coach/"
if (-not $NoBrowser -and ($helperConfig.coach_open_browser_on_start -ne $false)) {
    Start-Process $url
}

Write-Host ""
Write-Host "Charybdis Coach Started!" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host "Web UI: $url" -ForegroundColor Green
Write-Host ""
Write-Host "The coach will:" -ForegroundColor Yellow
Write-Host "  - Auto-switch layers when you hold layer keys" -ForegroundColor White
Write-Host "  - Highlight active keys in real-time" -ForegroundColor White
Write-Host "  - Show app-specific shortcuts" -ForegroundColor White
Write-Host ""
Write-Host "Requires: Keyboard connected via USB" -ForegroundColor Yellow
