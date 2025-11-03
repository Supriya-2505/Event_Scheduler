import React, { useState, useEffect } from 'react';
import EventList from '../components/EventList/EventList';
import AlertBox from '../components/Shared/AlertBox';
import useAlert from '../hooks/useAlert';
import api from '../services/api';
import './EventPage.css';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { alert, showError, showConfirm, hideAlert } = useAlert();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/events');
      if (response.data) {
        setEvents(response.data);
        setError('');
      } else {
        throw new Error('No data received from server');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.response?.data?.message || 'Failed to load events. Please try again.');
      
      // Only use sample data in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using sample data in development mode');
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
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEvent = async (eventId, eventData) => {
    try {
      if (eventId) {
        // Update existing event
        const response = await api.put(`/events/${eventId}`, eventData);
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === eventId ? response.data : event
          )
        );
      } else {
        // Create new event
        const response = await api.post('/events', eventData);
        setEvents(prevEvents => [...prevEvents, response.data]);
      }
      return { success: true };
    } catch (err) {
      console.error('Error saving event:', err);
      
      // Get the error message from the response
      const status = err.response?.status;
      const errorMessage = err.response?.data?.message || 'Already booked for the selected time slot. Please choose a different time.';
      const aiSuggestions = err.response?.data?.suggestions || [];

      if (status === 409) {
        setSuggestions(aiSuggestions);
      } else {
        setSuggestions([]);
      }

      // Return the specific error message from the backend
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const handleDeleteEvent = async (eventId) => {
    showConfirm(
      'Are you sure you want to delete this event? This action cannot be undone.',
      async () => {
        try {
          await api.delete(`/events/${eventId}`);
          setEvents(prevEvents =>
            prevEvents.filter(event => event.id !== eventId)
          );
        } catch (err) {
          console.error('Error deleting event:', err);
          showError('Failed to delete event. Please try again.', 'Delete Error');
        }
      },
      'Delete Event'
    );
  };

  if (loading) {
    return (
      <div className="event-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-page">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={fetchEvents}>Retry</button>
        </div>
      )}
      <EventList
        events={events}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
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

export default EventPage;