$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$shot = Join-Path (Get-Location) 'runtime\coach_fixed_layout.png'
$profile = Join-Path $env:TEMP 'chrome-coach-test'

& $chrome --headless=new --disable-gpu --hide-scrollbars `
  --window-size=1365,900 `
  --user-data-dir=$profile `
  --screenshot=$shot `
  'http://127.0.0.1:8765/apps/charybdis-coach/'

Start-Sleep -Seconds 2

if (Test-Path $shot) {
  Write-Host "Screenshot saved: $shot"
  Get-Item $shot | Select-Object FullName, Length
} else {
  Write-Host "Screenshot failed"
}
