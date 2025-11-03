# 🚀 Quick Start Guide - Maven & Hibernate Backend

## ✅ What's Already Configured

Your Spring Boot backend is ready with:
- **Maven** build system
- **Hibernate** ORM with PostgreSQL
- **REST API** endpoints
- **JPA entities** for Events and Tasks

## 🎯 Quick Setup (3 Steps)

### Step 1: Install PostgreSQL
1. Download from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember your `postgres` user password

### Step 2: Create Database
```sql
-- Open psql command line
psql -U postgres

-- Create database
CREATE DATABASE event_scheduler;
\q
```

### Step 3: Run Application
```bash
# Option 1: Use batch file (Windows)
run-app.bat

# Option 2: Use Maven directly
mvn spring-boot:run
```

## 🔧 Configuration

Update `src/main/resources/application.yml` with your PostgreSQL password:

```yaml
spring:
  datasource:
    username: postgres
    password: YOUR_POSTGRES_PASSWORD  # Change this!
```

## 🧪 Test It Works

1. **Start the app** - You should see:
   ```
   Started EventSchedulerBackendApplication in X.XXX seconds
   ```

2. **Test API** - Open browser:
   ```
   http://localhost:8080/api/events
   ```

3. **Check Database** - Hibernate creates tables automatically!

## 📁 Project Structure

```
backend/
├── src/main/java/com/eventscheduler/
│   ├── entity/          # Hibernate entities (Event, Task)
│   ├── repository/      # JPA repositories
│   ├── service/         # Business logic
│   ├── controller/      # REST controllers
│   └── dto/            # Data transfer objects
├── src/main/resources/
│   └── application.yml  # Configuration
├── pom.xml             # Maven dependencies
├── run-app.bat         # Windows run script
└── build.bat           # Windows build script
```

## 🎯 Maven Commands

```bash
# Build
mvn clean compile

# Run
mvn spring-boot:run

# Package
mvn clean package

# Test
mvn test
```

## 🔍 Hibernate Features

- **Auto table creation** - Tables created automatically
- **SQL logging** - See all queries in console
- **Entity relationships** - Event ↔ Task mapping
- **Audit fields** - created_at, updated_at
- **Validation** - Bean validation on entities

## 🚨 Troubleshooting

**Database Connection Error:**
- Check PostgreSQL is running
- Verify password in application.yml
- Ensure database `event_scheduler` exists

**Port Already in Use:**
- Change port in application.yml: `server.port: 8081`

**Maven Issues:**
- Run: `mvn clean install -U`

## 🎉 You're Ready!

Your Maven + Hibernate backend is configured and ready to use. The application will automatically create database tables when you first run it.

**Next:** Connect your React frontend to the API endpoints!
