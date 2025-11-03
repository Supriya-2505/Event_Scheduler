import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskManager/TaskList';
import api from '../services/api';
import './TaskPage.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasksAndEvents();
  }, []);

  const fetchTasksAndEvents = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch both tasks and events concurrently
      const [tasksResponse, eventsResponse] = await Promise.all([
        api.get('/tasks'),
        api.get('/events')
      ]);
      
      setTasks(tasksResponse.data);
      
      // Transform events for the task form dropdown
      const eventOptions = eventsResponse.data.map(event => ({
        id: event.id,
        title: event.title
      }));
      setEvents(eventOptions);
      
    } catch (err) {
      console.error('Error fetching tasks and events:', err);
      setError('Failed to load tasks. Using sample data.');
      
      // Fall back to sample data if API fails
      setTasks([
        {
          id: 1,
          title: 'Prepare presentation slides',
          description: 'Create slides for the quarterly review meeting with stakeholders.',
          dueDate: '2024-01-15',
          priority: 'HIGH',
          assignee: 'John Doe',
          eventId: 1,
          eventTitle: 'Team Meeting',
          completed: false
        },
        {
          id: 2,
          title: 'Book conference room',
          description: 'Reserve the main conference room for the project presentation.',
          dueDate: '2024-01-14',
          priority: 'MEDIUM',
          assignee: 'Jane Smith',
          eventId: 2,
          eventTitle: 'Project Presentation',
          completed: true
        },
        {
          id: 3,
          title: 'Prepare client materials',
          description: 'Gather all necessary documents and materials for the client call.',
          dueDate: '2024-01-16',
          priority: 'HIGH',
          assignee: 'Mike Johnson',
          eventId: 3,
          eventTitle: 'Client Call',
          completed: false
        }
      ]);
      
      setEvents([
        { id: 1, title: 'Team Meeting' },
        { id: 2, title: 'Project Presentation' },
        { id: 3, title: 'Client Call' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      // Transform priority to match backend enum if needed
      const transformedTaskData = {
        ...taskData,
        priority: taskData.priority?.toUpperCase() || 'MEDIUM'
      };
      
      if (taskId) {
        // Update existing task
        const response = await api.put(`/tasks/${taskId}`, transformedTaskData);
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? response.data : task
          )
        );
      } else {
        // Create new task
        const response = await api.post('/tasks', transformedTaskData);
        setTasks(prevTasks => [...prevTasks, response.data]);
      }
    } catch (err) {
      console.error('Error saving task:', err);
      alert('Failed to save task. Please try again.');
      
      // If API fails, still update locally for demo purposes
      if (taskId) {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === taskId ? { ...task, ...taskData } : task
          )
        );
      } else {
        const newTask = {
          id: Date.now(),
          ...taskData,
          priority: taskData.priority?.toUpperCase() || 'MEDIUM'
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prevTasks =>
        prevTasks.filter(task => task.id !== taskId)
      );
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle`);
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? response.data : task
        )
      );
    } catch (err) {
      console.error('Error toggling task:', err);
      // If API fails, toggle locally
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    }
  };

  if (loading) {
    return (
      <div className="task-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-page">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={fetchTasksAndEvents}>Retry</button>
        </div>
      )}
      <TaskList
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
        events={events}
      />
    </div>
  );
};

export default TaskPage;