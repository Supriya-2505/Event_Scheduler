@echo off
echo Stopping PostgreSQL database...

REM Stop and remove containers
docker-compose down

echo ✅ PostgreSQL database stopped!
echo Note: Data is preserved in Docker volumes.
echo To remove all data, run: docker-compose down -v
