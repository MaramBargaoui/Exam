@echo off
setlocal

if exist "C:\Program Files\Microsoft\jdk-25.0.3.9-hotspot" (
    set "JAVA_HOME=C:\Program Files\Microsoft\jdk-25.0.3.9-hotspot"
) else if exist "C:\Program Files\Java\jdk-25" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-25"
) else if exist "C:\Program Files\Java\jdk-23" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-23"
) else if exist "C:\Program Files\Java\jdk-21" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-21"
) else if exist "C:\Program Files\Java\jdk-17" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-17"
) else (
    echo ERROR: No JDK found. Install Java or set JAVA_HOME manually.
    exit /b 1
)

echo Using JAVA_HOME=%JAVA_HOME%

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1

cd /d "%~dp0"
call mvnw.cmd spring-boot:run -Dmaven.test.skip=true %*
