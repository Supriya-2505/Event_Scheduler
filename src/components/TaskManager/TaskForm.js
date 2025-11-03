import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSave, onCancel, isOpen, events = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    assignee: '',
    eventId: '',
    completed: false
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate || '',
        priority: task.priority || 'medium',
        assignee: task.assignee || '',
        eventId: task.eventId || '',
        completed: task.completed || false
      });
    } else {
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        assignee: '',
        eventId: '',
        completed: false
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button className="modal-close" onClick={onCancel}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Enter task title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              rows="3"
              placeholder="Enter task description"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dueDate" className="form-label">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="priority" className="form-label">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-input"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assignee" className="form-label">Assignee</label>
              <input
                type="text"
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter assignee name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="eventId" className="form-label">Related Event</label>
              <select
                id="eventId"
                name="eventId"
                value={formData.eventId}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select an event (optional)</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {task && (
            <div className="form-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="form-checkbox-custom"></span>
                Mark as completed
              </label>
            </div>
          )}
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
