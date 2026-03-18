@echo off
set PGPASSWORD=Ntokz@084
echo Connecting to PostgreSQL...
echo.
echo Available databases:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "\l"
echo.
echo Tables in sa_id_validator database:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d sa_id_validator -c "\dt"
echo.
echo Sample data from users table:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d sa_id_validator -c "SELECT username, email, role, enabled FROM users;"
pause
