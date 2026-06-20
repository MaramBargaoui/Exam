# Detect JDK 21+ automatically
$jdkPaths = @(
    "C:\Program Files\Microsoft\jdk-25.0.3.9-hotspot",
    "C:\Program Files\Java\jdk-25",
    "C:\Program Files\Java\jdk-23",
    "C:\Program Files\Java\jdk-21"
)

$jdkHome = $null
foreach ($path in $jdkPaths) {
    if (Test-Path $path) {
        $jdkHome = $path
        break
    }
}

if (-not $jdkHome) {
    Write-Host "ERROR: JDK 21+ not found. Install JDK 21+ or set JAVA_HOME manually." -ForegroundColor Red
    exit 1
}

Write-Host "Using JAVA_HOME=$jdkHome" -ForegroundColor Green
$env:JAVA_HOME = $jdkHome

# Free port 8080 if a previous backend instance is still running
$portInUse = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
if ($portInUse) {
    $pid8080 = $portInUse.OwningProcess | Select-Object -First 1
    Write-Host "Port 8080 is in use (PID $pid8080). Stopping previous backend..." -ForegroundColor Yellow
    Stop-Process -Id $pid8080 -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

& ".\mvnw.cmd" spring-boot:run "-Dmaven.test.skip=true" @args
