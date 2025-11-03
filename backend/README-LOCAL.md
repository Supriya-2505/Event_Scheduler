# Event Scheduler Backend - Local Setup (No Docker)

This guide will help you set up the Spring Boot backend with Maven and Hibernate using a local PostgreSQL installation.

## Prerequisites

1. **Java 17 or higher**
2. **Maven 3.6+**
3. **PostgreSQL 12+** installed locally

## Step 1: Install PostgreSQL

### Windows
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for the `postgres` user

### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Step 2: Create Database

1. **Open PostgreSQL command line:**
   ```bash
   psql -U postgres
   ```

2. **Create the database:**
   ```sql
   CREATE DATABASE event_scheduler;
   \q
   ```

3. **Run the setup script:**
   ```bash
   psql -U postgres -d event_scheduler -f setup-database.sql
   ```

## Step 3: Configure Application

Update the database credentials in `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/event_scheduler
    username: postgres  # or your PostgreSQL username
    password: your_password  # your PostgreSQL password
```

## Step 4: Run the Application

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Build with Maven:**
   ```bash
   mvn clean compile
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

   Or if you have Maven wrapper:
   ```bash
   ./mvnw spring-boot:run
   ```

## Step 5: Verify Setup

1. **Check application logs** - You should see:
   ```
   Started EventSchedulerBackendApplication in X.XXX seconds
   ```

2. **Test the API:**
   ```bash
   curl http://localhost:8080/api/events
   ```

3. **Check database tables:**
   ```sql
   psql -U postgres -d event_scheduler
   \dt
   ```

## Maven Commands

### Build
```bash
mvn clean compile
```

### Run Tests
```bash
mvn test
```

### Package
```bash
mvn clean package
```

### Run Application
```bash
mvn spring-boot:run
```

### Skip Tests
```bash
mvn clean package -DskipTests
```

## Hibernate Configuration

The application uses Hibernate with these key settings:

- **DDL Auto**: `update` - Automatically creates/updates tables
- **Dialect**: `PostgreSQLDialect` - Optimized for PostgreSQL
- **Show SQL**: `true` - Logs all SQL queries (development only)

## Database Schema

Hibernate will automatically create these tables:

### events
- id (Primary Key)
- title
- description
- date
- time
- location
- attendees_count
- status
- created_at
- updated_at

### tasks
- id (Primary Key)
- title
- description
- due_date
- priority
- assignee
- completed
- event_id (Foreign Key)
- created_at
- updated_at

## Troubleshooting

### Database Connection Issues
1. **Check PostgreSQL is running:**
   ```bash
   # Windows
   services.msc
   
   # macOS/Linux
   sudo systemctl status postgresql
   ```

2. **Test connection:**
   ```bash
   psql -U postgres -h localhost -p 5432
   ```

3. **Check credentials** in `application.yml`

### Maven Issues
1. **Clear Maven cache:**
   ```bash
   mvn dependency:purge-local-repository
   ```

2. **Update dependencies:**
   ```bash
   mvn clean install -U
   ```

### Port Already in Use
Change the port in `application.yml`:
```yaml
server:
  port: 8081  # Change from 8080
```

## API Endpoints

Once running, you can access:

- **Events API**: http://localhost:8080/api/events
- **Tasks API**: http://localhost:8080/api/tasks
- **Dashboard API**: http://localhost:8080/api/dashboard/stats

## Development Tips

1. **Enable DevTools** for auto-restart on code changes
2. **Use IDE integration** - Most IDEs support Maven projects
3. **Check logs** for Hibernate SQL queries
4. **Use pgAdmin** for database management (optional)

## Next Steps

1. Test the API endpoints
2. Connect your React frontend
3. Add sample data for testing
4. Configure production settings

## AI Suggestions (Optional)

The backend can call OpenAI to provide suggested alternative hotels when a booking conflict is detected. To enable this, set the environment variable `OPENAI_API_KEY` before running the application.

On Windows (PowerShell):

```powershell
$env:OPENAI_API_KEY = "<your_api_key_here>"
mvn spring-boot:run
```

On macOS/Linux:

```bash
export OPENAI_API_KEY="<your_api_key_here>"
mvn spring-boot:run
```

If the key is not set, the backend will still return the conflict error but without AI suggestions.
