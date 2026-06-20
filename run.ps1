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

& ".\mvnw.cmd" spring-boot:run -Dmaven.test.skip=true $args
