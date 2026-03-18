@echo off
echo Setting up PostgreSQL database for SA ID Validator...

REM Set PostgreSQL 18 path
set PSQL_PATH="C:\Program Files\PostgreSQL\18\bin\psql.exe"

REM Check if psql exists
if not exist %PSQL_PATH% (
    echo PostgreSQL 18 not found at expected location
    echo Please install PostgreSQL 18 or update the path in this script
    pause
    exit /b 1
)

echo Starting PostgreSQL service...
net start postgresql-x64-18 2>nul
if %errorlevel% neq 0 (
    echo Trying to start PostgreSQL 16 service...
    net start postgresql-x64-16 2>nul
)

echo Waiting for PostgreSQL to start...
timeout /t 5 /nobreak >nul

echo Creating database...
%PSQL_PATH% -U postgres -c "CREATE DATABASE sa_id_validator;" 2>nul
if %errorlevel% neq 0 (
    echo Database might already exist or connection failed
)

echo Setting password for postgres user...
%PSQL_PATH% -U postgres -c "ALTER USER postgres PASSWORD 'Ntokz@084';"

echo Database setup complete!
echo Database: sa_id_validator
echo Username: postgres
echo Password: Ntokz@084
echo Port: 5432

pause
