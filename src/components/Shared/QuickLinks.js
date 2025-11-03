import React from 'react';
import { Link } from 'react-router-dom';
import './QuickLinks.css';

const QuickLinks = () => {
  const quickActions = [
    {
      title: 'Create Event',
      description: 'Add a new event to your schedule',
      icon: '➕',
      link: '/events',
      color: 'blue'
    },
    {
      title: 'View Calendar',
      description: 'See all events in calendar view',
      icon: '📅',
      link: '/calendar',
      color: 'green'
    },
    {
      title: 'Manage Tasks',
      description: 'Organize your event tasks',
      icon: '✅',
      link: '/tasks',
      color: 'orange'
    },
    {
      title: 'Event Reports',
      description: 'View event analytics and reports',
      icon: '📊',
      link: '/reports',
      color: 'purple'
    }
  ];

  return (
    <div className="quick-links">
      <div className="quick-links-header">
        <h3>Quick Actions</h3>
        <p>Get started with these common tasks</p>
      </div>
      
      <div className="quick-links-grid">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className={`quick-link-card ${action.color}`}
          >
            <div className="quick-link-icon">
              {action.icon}
            </div>
            <div className="quick-link-content">
              <h4 className="quick-link-title">{action.title}</h4>
              <p className="quick-link-description">{action.description}</p>
            </div>
            <div className="quick-link-arrow">
              →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
