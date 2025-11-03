# Event Scheduler Backend

A Spring Boot REST API backend for the Event Scheduler application with PostgreSQL database integration.

## Features

- **RESTful API** for Events and Tasks management
- **PostgreSQL Database** with JPA/Hibernate
- **CORS Configuration** for frontend integration
- **Docker Support** for easy deployment
- **Comprehensive CRUD Operations**
- **Dashboard Statistics API**
- **Search and Filtering Capabilities**

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL 15**
- **Maven**
- **Docker & Docker Compose**
- **Lombok**

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `GET /api/events/status/{status}` - Get events by status
- `GET /api/events/upcoming` - Get upcoming events
- `GET /api/events/date/{date}` - Get events by date
- `GET /api/events/search?title={title}` - Search events by title

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task
- `PATCH /api/tasks/{id}/toggle` - Toggle task completion
- `GET /api/tasks/status/{completed}` - Get tasks by completion status
- `GET /api/tasks/priority/{priority}` - Get tasks by priority
- `GET /api/tasks/event/{eventId}` - Get tasks by event
- `GET /api/tasks/overdue` - Get overdue tasks
- `GET /api/tasks/due-today` - Get tasks due today
- `GET /api/tasks/search?title={title}` - Search tasks by title

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/upcoming-events` - Get upcoming events for dashboard
- `GET /api/dashboard/recent-tasks` - Get recent tasks for dashboard
- `GET /api/dashboard/overdue-tasks` - Get overdue tasks for dashboard

## Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Docker and Docker Compose (optional)

### Option 1: Using Docker Compose (Recommended)

1. **Start PostgreSQL database:**
   ```bash
   cd backend
   docker-compose up -d postgres
   ```

2. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Access the application:**
   - API: http://localhost:8080/api
   - PgAdmin: http://localhost:5050 (admin@eventscheduler.com / admin)

### Option 2: Local Development

1. **Install PostgreSQL locally:**
   - Create database: `event_scheduler`
   - Create user: `eventscheduler` with password: `password`

2. **Update application.yml if needed:**
   ```yaml
   spring:
     datasource:
       url: jdbc:postgresql://localhost:5432/event_scheduler
       username: eventscheduler
       password: password
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

### Option 3: Full Docker Setup

1. **Start all services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Access the application:**
   - API: http://localhost:8080/api
   - PgAdmin: http://localhost:5050

## Database Schema

### Events Table
- `id` (Primary Key)
- `title` (Required)
- `description`
- `date` (Required)
- `time` (Required)
- `location` (Required)
- `attendees_count`
- `status` (PENDING, CONFIRMED, CANCELLED)
- `created_at`
- `updated_at`

### Tasks Table
- `id` (Primary Key)
- `title` (Required)
- `description`
- `due_date`
- `priority` (LOW, MEDIUM, HIGH)
- `assignee`
- `completed` (Boolean)
- `event_id` (Foreign Key)
- `created_at`
- `updated_at`

## Configuration

### Environment Variables
- `DB_USERNAME` - Database username (default: eventscheduler)
- `DB_PASSWORD` - Database password (default: password)
- `SPRING_PROFILES_ACTIVE` - Active profile (default: dev)

### Profiles
- `dev` - Development profile with debug logging
- `prod` - Production profile (create as needed)

## Development

### Building the Application
```bash
./mvnw clean package
```

### Running Tests
```bash
./mvnw test
```

### Code Style
The project uses Lombok to reduce boilerplate code. Make sure your IDE has Lombok plugin installed.

## API Documentation

### Sample Event JSON
```json
{
  "title": "Team Meeting",
  "description": "Weekly team sync",
  "date": "2024-01-15",
  "time": "10:00:00",
  "location": "Conference Room A",
  "attendees": 8,
  "status": "CONFIRMED"
}
```

### Sample Task JSON
```json
{
  "title": "Prepare presentation",
  "description": "Create slides for meeting",
  "dueDate": "2024-01-14",
  "priority": "HIGH",
  "assignee": "John Doe",
  "completed": false,
  "eventId": 1
}
```

## Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Ensure PostgreSQL is running
   - Check database credentials in application.yml
   - Verify database exists

2. **CORS Issues:**
   - Check CORS configuration in CorsConfig.java
   - Ensure frontend URL is in allowed origins

3. **Port Already in Use:**
   - Change server.port in application.yml
   - Or stop the process using the port

### Logs
Check application logs for detailed error information:
```bash
tail -f logs/application.log
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
