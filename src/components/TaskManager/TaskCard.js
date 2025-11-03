import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      case 'low':
        return 'low';
      default:
        return 'low';
    }
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !task.completed;
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
      <div className="task-card-header">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="task-checkbox-input"
          />
          <span className="task-checkbox-custom"></span>
        </div>
        
        <div className={`task-priority ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </div>
      </div>
      
      <div className="task-card-content">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">{task.description}</p>
        
        <div className="task-details">
          {task.eventTitle && (
            <div className="task-detail">
              <span className="detail-icon">🎉</span>
              <span className="detail-text">{task.eventTitle}</span>
            </div>
          )}
          
          <div className="task-detail">
            <span className="detail-icon">📅</span>
            <span className={`detail-text ${isOverdue(task.dueDate) ? 'overdue' : ''}`}>
              {formatDate(task.dueDate)}
            </span>
          </div>
          
          {task.assignee && (
            <div className="task-detail">
              <span className="detail-icon">👤</span>
              <span className="detail-text">{task.assignee}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="task-card-actions">
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
