# Stop the backend running on port 8080
$portInUse = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
if ($portInUse) {
    $pid8080 = $portInUse.OwningProcess | Select-Object -First 1
    Stop-Process -Id $pid8080 -Force -ErrorAction SilentlyContinue
    Write-Host "Backend stopped (PID $pid8080)." -ForegroundColor Green
} else {
    Write-Host "No backend running on port 8080." -ForegroundColor Yellow
}
