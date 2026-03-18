@echo off
title SA ID Validator Backend
color 0A
echo ========================================
echo    SA ID Validator Backend Launcher
echo ========================================
echo.

REM Kill any existing process on port 8080
echo Cleaning up existing processes...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
    echo Killing process %%a...
    taskkill /PID %%a /F >nul 2>&1
)
timeout /t 2 /nobreak >nul

REM Set environment variables
set DATABASE_URL=jdbc:postgresql://localhost:5432/sa_id_validator
set DB_USERNAME=postgres
set DB_PASSWORD=Ntokz@084
set SERVER_PORT=8080
set SPRING_PROFILES_ACTIVE=default

echo Starting backend with database connection...
echo Database: %DATABASE_URL%
echo Port: %SERVER_PORT%
echo.

REM Start the backend
echo ========================================
echo    Starting Spring Boot Application
echo ========================================
echo.

if exist "gradle-8.0\bin\gradle.bat" (
    gradle-8.0\bin\gradle.bat bootRun
) else (
    echo ERROR: Gradle not found!
    pause
    exit /b 1
)

echo.
echo Backend stopped.
pause
