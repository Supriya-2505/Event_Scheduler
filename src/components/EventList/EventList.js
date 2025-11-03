import React, { useState } from 'react';
import EventCard from './EventCard';
import EventForm from './EventForm';
import EventDetails from './EventDetails';
import './EventList.css';

const EventList = ({ events, onUpdateEvent, onDeleteEvent }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewingEvent, setViewingEvent] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleViewEvent = (event) => {
    setViewingEvent(event);
  };

  const handleCloseView = () => {
    setViewingEvent(null);
  };

  const handleSaveEvent = async (eventData) => {
    const result = await onUpdateEvent(editingEvent?.id || null, eventData);
    
    if (result.success) {
      setIsFormOpen(false);
      setEditingEvent(null);
    } else {
      // Error will be handled by the EventForm component
      return result.error;
    }
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    onDeleteEvent(eventId);
  };

  const filteredEvents = events.filter(event => {
    const normalizedStatus = (event?.status ?? '').toString().toLowerCase();
    const matchesFilter = filter === 'all' || normalizedStatus === filter;

    const title = (event?.title ?? '').toString().toLowerCase();
    const description = (event?.description ?? '').toString().toLowerCase();
    const location = (event?.location ?? '').toString().toLowerCase();
    const term = (searchTerm ?? '').toString().toLowerCase();

    const matchesSearch = title.includes(term) || description.includes(term) || location.includes(term);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="event-list">
      <div className="event-list-header">
        <div className="event-list-title">
          <h2>Events</h2>
          <p>Manage your events and schedules</p>
        </div>
        
        <button className="btn btn-primary" onClick={handleCreateEvent}>
          ➕ Create Event
        </button>
      </div>

      <div className="event-list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="event-list-content">
        {filteredEvents.length > 0 ? (
          <div className="event-grid">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
                onView={handleViewEvent}
              />
            ))}
          </div>
        ) : (
          <div className="no-events">
            <div className="no-events-icon">📅</div>
            <h3>No events found</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first event.'
              }
            </p>
            {!searchTerm && filter === 'all' && (
              <button className="btn btn-primary" onClick={handleCreateEvent}>
                Create Your First Event
              </button>
            )}
          </div>
        )}
      </div>

      <EventForm
        event={editingEvent}
        onSave={handleSaveEvent}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
        existingEvents={events}
      />
      
      <EventDetails
        event={viewingEvent}
        onClose={handleCloseView}
      />
    </div>
  );
};

export default EventList;
