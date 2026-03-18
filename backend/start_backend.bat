@echo off
echo Starting SA ID Validator Backend...
echo.

echo Checking if port 8080 is available...
netstat -ano | findstr :8080
if %ERRORLEVEL% == 0 (
    echo Port 8080 is in use. Killing existing process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do taskkill /PID %%a /F
    timeout /t 2 /nobreak >nul
)

echo Starting Spring Boot application...
echo.

REM Set environment variables
set DATABASE_URL=jdbc:postgresql://localhost:5432/sa_id_validator
set DB_USERNAME=postgres
set DB_PASSWORD=Ntokz@084
set SERVER_PORT=8080

REM Run with gradle
if exist "gradle-8.0\bin\gradle.bat" (
    echo Using downloaded Gradle...
    gradle-8.0\bin\gradle.bat bootRun
) else if exist "gradlew.bat" (
    echo Using Gradle wrapper...
    gradlew.bat bootRun
) else (
    echo Gradle not found. Please install Gradle or use the gradlew wrapper.
    pause
    exit /b 1
)

echo.
echo Backend stopped.
pause
