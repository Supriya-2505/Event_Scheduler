import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/events', label: 'Events', icon: '🎉' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3>Navigation</h3>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <div className="quick-stats">
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8</span>
              <span className="stat-label">Tasks</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
