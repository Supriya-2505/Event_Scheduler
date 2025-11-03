import React from 'react';
import './DateSelector.css';

const DateSelector = ({ currentDate, onDateChange, viewType, onViewTypeChange }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    onDateChange(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="date-selector">
      <div className="date-selector-controls">
        <button className="btn btn-secondary" onClick={goToPrevious}>
          ←
        </button>
        
        <div className="date-display">
          <h2 className="current-date">{formatDate(currentDate)}</h2>
          <button className="btn btn-secondary btn-sm" onClick={goToToday}>
            Today
          </button>
        </div>
        
        <button className="btn btn-secondary" onClick={goToNext}>
          →
        </button>
      </div>
      
      <div className="view-type-selector">
        <button
          className={`view-btn ${viewType === 'month' ? 'active' : ''}`}
          onClick={() => onViewTypeChange('month')}
        >
          Month
        </button>
        <button
          className={`view-btn ${viewType === 'week' ? 'active' : ''}`}
          onClick={() => onViewTypeChange('week')}
        >
          Week
        </button>
        <button
          className={`view-btn ${viewType === 'day' ? 'active' : ''}`}
          onClick={() => onViewTypeChange('day')}
        >
          Day
        </button>
      </div>
    </div>
  );
};

export default DateSelector;
