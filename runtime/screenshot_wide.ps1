$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$shot = Join-Path (Get-Location) 'runtime\coach_wide_1920x1080.png'
$profile = Join-Path $env:TEMP 'chrome-coach-wide'

& $chrome --headless=new --disable-gpu --hide-scrollbars `
  --window-size=1920,1080 `
  --user-data-dir=$profile `
  --screenshot=$shot `
  'http://127.0.0.1:8765/apps/charybdis-coach/'

Start-Sleep -Seconds 2

if (Test-Path $shot) {
  Write-Host "Wide screenshot saved"
  $shot
}
