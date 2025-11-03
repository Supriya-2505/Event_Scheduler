import React from 'react';
import './EventTooltip.css';

const EventTooltip = ({ event, position, isVisible, onClose }) => {
  if (!isVisible || !event) return null;

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getSafeStatus = (status) => {
    return String(status || 'pending').toLowerCase();
  };

  return (
    <div
      className="event-tooltip"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="tooltip-header">
        <h4 className="tooltip-title">{event.title}</h4>
        <button className="tooltip-close" onClick={onClose}>
          ×
        </button>
      </div>
      
      <div className="tooltip-content">
        <div className="tooltip-detail">
          <span className="tooltip-icon">🕒</span>
          <span className="tooltip-text">{formatTime(event.time)}</span>
        </div>
        
        <div className="tooltip-detail">
          <span className="tooltip-icon">📍</span>
          <span className="tooltip-text">{event.location}</span>
        </div>
        
        {event.attendees && (
          <div className="tooltip-detail">
            <span className="tooltip-icon">👥</span>
            <span className="tooltip-text">{event.attendees} attendees</span>
          </div>
        )}
        
        {event.description && (
          <div className="tooltip-description">
            <p>{event.description}</p>
          </div>
        )}
      </div>
      
      <div className="tooltip-footer">
        <span className={`tooltip-status ${getSafeStatus(event.status)}`}>
          {event.status || 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default EventTooltip;
