@echo off
set PGPASSWORD=Ntokz@084
echo Running SQL query on sa_id_validator database...
echo.
echo Users table data:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d sa_id_validator -c "SELECT username, email, role, enabled FROM users;"
echo.
echo Tables in database:
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d sa_id_validator -c "\dt"
pause
