# Automated Result Logger
# Appends results to session file automatically

param(
    [Parameter(Mandatory=$true)]
    [string]$SessionFolder,

    [Parameter(Mandatory=$true)]
    [string]$TestName,

    [Parameter(Mandatory=$true)]
    [string]$Result
)

$resultsFile = Join-Path $SessionFolder "*_results.md"
$resultsPath = Get-Item $resultsFile | Select-Object -First 1

if (-not $resultsPath) {
    Write-Host "ERROR: Results file not found in $SessionFolder" -ForegroundColor Red
    exit 1
}

# Append result with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$logEntry = "`n## $TestName - $timestamp`n$Result`n"

Add-Content -Path $resultsPath.FullName -Value $logEntry

Write-Host "✅ Logged to: $($resultsPath.Name)" -ForegroundColor Green
Write-Host "   Test: $TestName" -ForegroundColor Cyan
Write-Host "   Result: $Result" -ForegroundColor White
