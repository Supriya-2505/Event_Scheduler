import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">📅</span>
            <span className="brand-text">Event Scheduler</span>
          </Link>
        </div>
        
        <div className="navbar-menu">
          <div className="navbar-nav">
            <Link to="/" className="nav-link">
              Dashboard
            </Link>
            <Link to="/events" className="nav-link">
              Events
            </Link>
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
            <Link to="/tasks" className="nav-link">
              Tasks
            </Link>
          </div>
          
          <div className="navbar-user">
            <div className="user-avatar">
              <span>👤</span>
            </div>
            <span className="user-name">{user?.fullName || 'User'}</span>
            <button 
              className="logout-button"
              onClick={() => {
                // Clear all auth-related data
                localStorage.clear(); // This will remove all localStorage items
                // Force navigation to login page
                navigate('/login', { replace: true });
                // Reload the page to reset all application state
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
