@echo off
echo Checking backend health...
echo.

echo Testing database connection...
timeout /t 3 /nobreak >nul

echo Testing simple ping endpoint...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8080/api/ping' -Method Get; Write-Host '✅ Backend is running and responding!'; Write-Host 'Response:' $response.message } catch { Write-Host '❌ Backend is not responding on port 8080' }"

echo.
echo Testing health endpoint...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8080/api/health' -Method Get; Write-Host 'Health Status:' $response.status; Write-Host 'Database:' $response.database } catch { Write-Host 'Health endpoint failed' }"

echo.
echo Available endpoints:
echo - Health: http://localhost:8080/api/health
echo - Ping: http://localhost:8080/api/ping
echo - ID Validation: http://localhost:8080/api/v1/id-validation/validate
echo - Actuator: http://localhost:8080/api/actuator/health
echo - API Docs: http://localhost:8080/api/swagger-ui.html

echo.
pause
