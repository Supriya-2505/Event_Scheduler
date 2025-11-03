# Event Scheduler UI

A modern React-based event management application with a beautiful and responsive user interface.

## Features

### 🎯 Core Functionality
- **Dashboard**: Overview with summary cards, upcoming events, and quick actions
- **Event Management**: Create, edit, delete, and view events with full CRUD operations
- **Calendar View**: Interactive calendar with month, week, and day views
- **Task Management**: Organize tasks with priorities, due dates, and event associations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 🎨 UI Components
- **Modern Design**: Clean, professional interface with smooth animations
- **Interactive Elements**: Hover effects, tooltips, and modal dialogs
- **Status Indicators**: Visual status badges for events and tasks
- **Priority System**: Color-coded priority levels for tasks
- **Search & Filter**: Advanced filtering and search capabilities

### 📱 Responsive Layout
- **Mobile-First**: Optimized for mobile devices
- **Flexible Grid**: Adaptive layouts that work on all screen sizes
- **Touch-Friendly**: Large touch targets and intuitive gestures

## Project Structure

```
src/
├── components/
│   ├── Shared/           # Reusable components (Person 1)
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── Footer.js
│   │   ├── SummaryCard.js
│   │   ├── UpcomingEventsWidget.js
│   │   └── QuickLinks.js
│   ├── EventList/        # Event management (Person 2)
│   │   ├── EventList.js
│   │   ├── EventCard.js
│   │   └── EventForm.js
│   ├── CalendarView/     # Calendar functionality (Person 3)
│   │   ├── CalendarView.js
│   │   ├── DateSelector.js
│   │   └── EventTooltip.js
│   └── TaskManager/      # Task management (Person 4)
│       ├── TaskList.js
│       ├── TaskCard.js
│       └── TaskForm.js
├── pages/                # Main application pages
│   ├── Dashboard.js
│   ├── EventPage.js
│   ├── CalendarPage.js
│   └── TaskPage.js
├── App.js               # Main application component
├── App.css
├── index.js
└── index.css
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Component Responsibilities

### Person 1 - Layout & Dashboard
- **Owns**: Navbar, Sidebar, Footer, Dashboard, SummaryCard
- **Goal**: Provide navigation + quick overview
- **Output**: Clean layout, routing setup, dashboard with summary widgets

### Person 2 - Event Management
- **Owns**: EventPage, EventList, EventCard, EventForm
- **Goal**: Handle CRUD for events (create/edit/delete)
- **Output**: Event list page + form modal/page connected to state

### Person 3 - Calendar & Scheduling
- **Owns**: CalendarPage, CalendarView, EventTooltip, DateSelector
- **Goal**: Show events visually on a calendar
- **Output**: Interactive calendar view (day/week/month), click-to-add events

### Person 4 - Task Management & UI Polish
- **Owns**: TaskPage, TaskList, TaskCard, TaskForm
- **Goal**: Manage tasks per event & polish UI
- **Output**: Task manager + global styling, animations, responsiveness

## Features Overview

### Dashboard
- Summary statistics cards with trend indicators
- Upcoming events widget with quick access
- Quick action buttons for common tasks
- Responsive grid layout

### Event Management
- Create, edit, and delete events
- Event status management (confirmed, pending, cancelled)
- Search and filter functionality
- Event details with location, time, and attendees

### Calendar View
- Multiple view modes (month, week, day)
- Interactive date navigation
- Event tooltips with detailed information
- Click-to-add events functionality

### Task Management
- Task creation with priorities and due dates
- Task completion tracking
- Overdue task highlighting
- Event association for tasks
- Comprehensive filtering and search

## Styling & Design

- **Color Scheme**: Modern blue and gray palette
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins throughout
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Proper contrast ratios and keyboard navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Authors

SUPRIYA K
HARISH J
GOBIKHA P S
