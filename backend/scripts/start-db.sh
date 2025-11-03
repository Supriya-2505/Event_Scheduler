#!/bin/bash

# Start PostgreSQL database using Docker Compose
echo "Starting PostgreSQL database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Start PostgreSQL container
docker-compose up -d postgres

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Check if database is accessible
if docker-compose exec postgres pg_isready -U eventscheduler -d event_scheduler > /dev/null 2>&1; then
    echo "✅ PostgreSQL database is ready!"
    echo "Database URL: jdbc:postgresql://localhost:5432/event_scheduler"
    echo "Username: eventscheduler"
    echo "Password: password"
    echo ""
    echo "To access PgAdmin: http://localhost:5050"
    echo "Email: admin@eventscheduler.com"
    echo "Password: admin"
else
    echo "❌ Database is not ready. Please check the logs:"
    docker-compose logs postgres
    exit 1
fi
