@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0fetch-openapi.ps1" %*
