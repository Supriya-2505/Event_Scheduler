import React from 'react';
import './EventDetails.css';

const EventDetails = ({ event, onClose }) => {
  if (!event) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '—';
    return timeString;
  };

  const getStatusColor = (status) => {
    // Ensure status is a string and handle null/undefined cases
    const statusString = String(status || '').toLowerCase();
    switch (statusString) {
      case 'confirmed':
        return 'confirmed';
      case 'pending':
        return 'pending';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="event-details-modal">
        <div className="event-details-header">
          <h2 className="event-details-title">Event Details</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="event-details-content">
          <div className="event-details-main">
            <div className="event-details-title-section">
              <h1 className="event-main-title">{event.title}</h1>
              <div className={`event-status-badge ${getStatusColor(event.status)}`}>
                {event.status}
              </div>
            </div>
            
            {event.description && (
              <div className="event-details-section">
                <h3 className="section-title">Description</h3>
                <p className="section-content">{event.description}</p>
              </div>
            )}
          </div>
          
          <div className="event-details-info">
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">
                  <span className="info-icon">📅</span>
                  Date
                </div>
                <div className="info-value">{formatDate(event.date)}</div>
              </div>
              
              <div className="info-item">
                <div className="info-label">
                  <span className="info-icon">🕒</span>
                  Time
                </div>
                <div className="info-value">{formatTime(event.time)}</div>
              </div>
              
              {event.place && (
                <div className="info-item">
                  <div className="info-label">
                    <span className="info-icon">🌍</span>
                    Place
                  </div>
                  <div className="info-value">{event.place}</div>
                </div>
              )}
              
              <div className="info-item">
                <div className="info-label">
                  <span className="info-icon">📍</span>
                  Location
                </div>
                <div className="info-value">{event.location}</div>
              </div>
              
              {event.foodPreferences && (
                <div className="info-item">
                  <div className="info-label">
                    <span className="info-icon">🍽️</span>
                    Food Preferences
                  </div>
                  <div className="info-value">{event.foodPreferences}</div>
                </div>
              )}
              
              {event.attendees && (
                <div className="info-item">
                  <div className="info-label">
                    <span className="info-icon">👥</span>
                    Expected Attendees
                  </div>
                  <div className="info-value">{event.attendees} people</div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="event-details-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
