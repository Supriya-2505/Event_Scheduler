import React, { useState, useEffect } from 'react';
import DateSelector from '../components/CalendarView/DateSelector';
import CalendarView from '../components/CalendarView/CalendarView';
import EventForm from '../components/EventList/EventForm';
import AlertBox from '../components/Shared/AlertBox';
import useAlert from '../hooks/useAlert';
import api from '../services/api';
import './CalendarPage.css';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState('month');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { alert, showError, hideAlert } = useAlert();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/events');
      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Using sample data.');
      
      // Fall back to sample data if API fails
      setEvents([
        {
          id: 1,
          title: 'Team Meeting',
          description: 'Weekly team sync to discuss project progress and upcoming milestones.',
          date: '2024-01-15',
          time: '10:00',
          location: 'Conference Room A',
          attendees: 8,
          status: 'confirmed'
        },
        {
          id: 2,
          title: 'Project Presentation',
          description: 'Present the final project deliverables to stakeholders.',
          date: '2024-01-16',
          time: '14:00',
          location: 'Main Hall',
          attendees: 25,
          status: 'pending'
        },
        {
          id: 3,
          title: 'Client Call',
          description: 'Discuss project requirements and timeline with the client.',
          date: '2024-01-17',
          time: '11:30',
          location: 'Online',
          attendees: 3,
          status: 'confirmed'
        },
        {
          id: 4,
          title: 'Workshop Session',
          description: 'Training session on new development tools and best practices.',
          date: '2024-01-18',
          time: '09:00',
          location: 'Training Room',
          attendees: 15,
          status: 'pending'
        },
        {
          id: 5,
          title: 'Review Meeting',
          description: 'Code review session for the latest feature implementation.',
          date: '2024-01-19',
          time: '15:00',
          location: 'Conference Room B',
          attendees: 5,
          status: 'confirmed'
        },
        {
          id: 6,
          title: 'Product Launch',
          description: 'Launch event for our new product with media and stakeholders.',
          date: '2024-01-20',
          time: '18:00',
          location: 'Event Center',
          attendees: 100,
          status: 'pending'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewTypeChange = (newViewType) => {
    setViewType(newViewType);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEventClick = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        // Update existing event
        const response = await api.put(`/events/${editingEvent.id}`, eventData);
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === editingEvent.id ? response.data : event
          )
        );
      } else {
        // Create new event
        const newEventData = selectedDate 
          ? { ...eventData, date: selectedDate.toISOString().split('T')[0] }
          : eventData;
        
        const response = await api.post('/events', newEventData);
        setEvents(prevEvents => [...prevEvents, response.data]);
      }
      
      setIsFormOpen(false);
      setEditingEvent(null);
      setSelectedDate(null);
    } catch (err) {
      console.error('Error saving event:', err);
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to save event. Please try again.';
      const aiSuggestions = err.response?.data?.suggestions || [];

      if (status === 409) {
        showError(message, 'Hotel already booked');
        setSuggestions(aiSuggestions);
      } else {
        showError(message, 'Save Error');
        setSuggestions([]);
      }
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  if (loading) {
    return (
      <div className="calendar-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <div className="calendar-page-header">
        <h1>Calendar</h1>
        <p>View and manage your events in calendar format</p>
        {error && (
          <div className="error-banner">
            {error}
            <button onClick={fetchEvents}>Retry</button>
          </div>
        )}
      </div>

      <DateSelector
        currentDate={currentDate}
        onDateChange={handleDateChange}
        viewType={viewType}
        onViewTypeChange={handleViewTypeChange}
      />

      <CalendarView
        events={events}
        currentDate={currentDate}
        viewType={viewType}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />

      <EventForm
        event={editingEvent}
        onSave={handleSaveEvent}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
        existingEvents={events}
      />
      {suggestions && suggestions.length > 0 && (
        <div className="ai-suggestions">
          <h3>Recommended alternatives</h3>
          <div className="suggestion-list">
            {suggestions.map((s, idx) => (
              <div key={idx} className="suggestion-card">
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <AlertBox
        type={alert.type}
        title={alert.title}
        message={alert.message}
        isOpen={alert.isOpen}
        onClose={hideAlert}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        showConfirmButton={alert.showConfirmButton}
        onConfirm={alert.onConfirm}
      />
    </div>
  );
};

export default CalendarPage;