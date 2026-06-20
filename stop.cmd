@echo off
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080 ^| findstr LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
    echo Backend stopped (PID %%a).
    exit /b 0
)
echo No backend running on port 8080.
