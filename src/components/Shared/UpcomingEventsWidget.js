import React from 'react';
import { Link } from 'react-router-dom';
import './UpcomingEventsWidget.css';

const UpcomingEventsWidget = ({ events = [] }) => {
  const upcomingEvents = events.slice(0, 5);

  return (
    <div className="upcoming-events-widget">
      <div className="widget-header">
        <h3>Upcoming Events</h3>
        <Link to="/events" className="view-all-link">
          View All
        </Link>
      </div>
      
      <div className="events-list">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => (
            <div key={index} className="event-item">
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
              <div className="event-details">
                <h4 className="event-title">{event.title}</h4>
                <p className="event-time">{event.time}</p>
                <p className="event-location">{event.location}</p>
              </div>
              <div className={`event-status ${event.status}`}>
                {event.status}
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No upcoming events</p>
            <Link to="/events" className="btn btn-primary">
              Create Event
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEventsWidget;
