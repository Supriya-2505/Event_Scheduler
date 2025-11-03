import React, { useState, useEffect } from 'react';
import EventTooltip from './EventTooltip';
import './CalendarView.css';

const CalendarView = ({ events = [], currentDate, viewType, onDateClick, onEventClick }) => {
  const [tooltip, setTooltip] = useState({ isVisible: false, event: null, position: { x: 0, y: 0 } });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getWeekDays = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);
      week.push(weekDay);
    }
    
    return week;
  };

  const getEventsForDate = (date) => {
    if (!date || !Array.isArray(events)) return [];
    const dateString = date.toISOString().split('T')[0];
    return (events || []).filter(event => event.date === dateString);
  };

  const handleEventMouseEnter = (event, e) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      isVisible: true,
      event,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top
      }
    });
  };

  const handleEventMouseLeave = () => {
    setTooltip({ isVisible: false, event: null, position: { x: 0, y: 0 } });
  };

  const handleDateClick = (date) => {
    if (date && onDateClick) {
      onDateClick(date);
    }
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    if (onEventClick) {
      onEventClick(event);
    }
  };

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="calendar-month">
        <div className="calendar-header">
          {dayNames.map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
        </div>
        
        <div className="calendar-body">
          {days.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = day && day.toDateString() === new Date().toDateString();
            const isCurrentMonth = day && day.getMonth() === currentDate.getMonth();
            
            return (
              <div
                key={index}
                className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                {day && (
                  <>
                    <div className="day-number">{day.getDate()}</div>
                    <div className="day-events">
                      {dayEvents.slice(0, 3).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`event-indicator ${event.status}`}
                          onClick={(e) => handleEventClick(event, e)}
                          onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                          onMouseLeave={handleEventMouseLeave}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="more-events">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="calendar-week">
        <div className="calendar-header">
          <div className="time-column">Time</div>
          {weekDays.map((day, index) => (
            <div key={index} className="calendar-day-header">
              <div className="day-name">{dayNames[day.getDay()]}</div>
              <div className="day-number">{day.getDate()}</div>
            </div>
          ))}
        </div>
        
        <div className="calendar-body">
          {Array.from({ length: 24 }, (_, hour) => (
            <div key={hour} className="time-slot">
              <div className="time-label">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDate(day).filter(event => {
                  const eventHour = parseInt(event.time.split(':')[0]);
                  return eventHour === hour;
                });
                
                return (
                  <div
                    key={dayIndex}
                    className="time-cell"
                    onClick={() => handleDateClick(day)}
                  >
                    {dayEvents.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`event-block ${event.status}`}
                        onClick={(e) => handleEventClick(event, e)}
                        onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                        onMouseLeave={handleEventMouseLeave}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const isToday = currentDate.toDateString() === new Date().toDateString();
    
    return (
      <div className="calendar-day-view">
        <div className="day-header">
          <h3 className="day-title">
            {currentDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h3>
          {isToday && <span className="today-badge">Today</span>}
        </div>
        
        <div className="day-events-list">
          {dayEvents.length > 0 ? (
            dayEvents.map((event, index) => (
              <div
                key={index}
                className={`day-event ${event.status}`}
                onClick={(e) => handleEventClick(event, e)}
                onMouseEnter={(e) => handleEventMouseEnter(event, e)}
                onMouseLeave={handleEventMouseLeave}
              >
                <div className="event-time">{event.time}</div>
                <div className="event-details">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-location">{event.location}</p>
                </div>
                <div className="event-status-badge">{event.status}</div>
              </div>
            ))
          ) : (
            <div className="no-events">
              <p>No events scheduled for this day</p>
              <button className="btn btn-primary" onClick={() => handleDateClick(currentDate)}>
                Add Event
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-view">
      {viewType === 'month' && renderMonthView()}
      {viewType === 'week' && renderWeekView()}
      {viewType === 'day' && renderDayView()}
      
      <EventTooltip
        event={tooltip.event}
        position={tooltip.position}
        isVisible={tooltip.isVisible}
        onClose={() => setTooltip({ isVisible: false, event: null, position: { x: 0, y: 0 } })}
      />
    </div>
  );
};

export default CalendarView;
