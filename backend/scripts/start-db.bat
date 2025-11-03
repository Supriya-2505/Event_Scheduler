@echo off
echo Starting PostgreSQL database...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running. Please start Docker first.
    exit /b 1
)

REM Start PostgreSQL container
docker-compose up -d postgres

REM Wait for database to be ready
echo Waiting for database to be ready...
timeout /t 10 /nobreak >nul

REM Check if database is accessible
docker-compose exec postgres pg_isready -U eventscheduler -d event_scheduler >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ PostgreSQL database is ready!
    echo Database URL: jdbc:postgresql://localhost:5432/event_scheduler
    echo Username: eventscheduler
    echo Password: password
    echo.
    echo To access PgAdmin: http://localhost:5050
    echo Email: admin@eventscheduler.com
    echo Password: admin
) else (
    echo ❌ Database is not ready. Please check the logs:
    docker-compose logs postgres
    exit /b 1
)
