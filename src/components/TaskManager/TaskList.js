import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, events = [] }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onUpdateTask(null, taskData);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDeleteTask(taskId);
    }
  };

  const handleToggleComplete = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      onUpdateTask(taskId, { ...task, completed: !task.completed });
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && task.completed) ||
                         (filter === 'pending' && !task.completed) ||
                         (filter === 'overdue' && !task.completed && task.dueDate && new Date(task.dueDate) < new Date());
    
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.assignee && task.assignee.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length;
    
    return { total, completed, pending, overdue };
  };

  const stats = getTaskStats();

  return (
    <div className="task-list">
      <div className="task-list-header">
        <div className="task-list-title">
          <h2>Tasks</h2>
          <p>Manage your tasks and to-dos</p>
        </div>
        
        <button className="btn btn-primary" onClick={handleCreateTask}>
          ➕ Create Task
        </button>
      </div>

      <div className="task-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      <div className="task-list-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
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
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            className={`filter-btn ${filter === 'overdue' ? 'active' : ''}`}
            onClick={() => setFilter('overdue')}
          >
            Overdue
          </button>
        </div>
      </div>

      <div className="task-list-content">
        {filteredTasks.length > 0 ? (
          <div className="task-grid">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        ) : (
          <div className="no-tasks">
            <div className="no-tasks-icon">✅</div>
            <h3>No tasks found</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first task.'
              }
            </p>
            {!searchTerm && filter === 'all' && (
              <button className="btn btn-primary" onClick={handleCreateTask}>
                Create Your First Task
              </button>
            )}
          </div>
        )}
      </div>

      <TaskForm
        task={editingTask}
        onSave={handleSaveTask}
        onCancel={handleCancelForm}
        isOpen={isFormOpen}
        events={events}
      />
    </div>
  );
};

export default TaskList;
