import React from 'react';
import './EventCard.css';

const EventCard = ({ event, onEdit, onDelete, onView }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
    <div className="event-card">
      <div className="event-card-header">
        <div className="event-date">
          {(() => {
            const d = event?.date ? new Date(event.date) : null;
            const valid = d && !isNaN(d.getTime());
            return (
              <>
                <span className="date-day">{valid ? d.getDate() : '—'}</span>
                <span className="date-month">{valid ? d.toLocaleDateString('en-US', { month: 'short' }) : '—'}</span>
              </>
            );
          })()}
        </div>
        <div className={`event-status ${getStatusColor(event.status)}`}>
          {event.status}
        </div>
      </div>
      
      <div className="event-card-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">{event.description}</p>
        
        <div className="event-details">
          <div className="event-detail">
            <span className="detail-icon">🕒</span>
            <span className="detail-text">{event.time}</span>
          </div>
          <div className="event-detail">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{event.location}</span>
          </div>
          <div className="event-detail">
            <span className="detail-icon">👥</span>
            <span className="detail-text">{event.attendees} attendees</span>
          </div>
        </div>
      </div>
      
      <div className="event-card-actions">
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onView(event)}
        >
          View
        </button>
        <button 
          className="btn btn-primary btn-sm"
          onClick={() => onEdit(event)}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(event.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
