#!/bin/bash

# Stop PostgreSQL database using Docker Compose
echo "Stopping PostgreSQL database..."

# Stop and remove containers
docker-compose down

echo "✅ PostgreSQL database stopped!"
echo "Note: Data is preserved in Docker volumes."
echo "To remove all data, run: docker-compose down -v"
