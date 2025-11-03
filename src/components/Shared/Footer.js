import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Event Scheduler</h4>
            <p>Manage your events and tasks efficiently with our modern scheduling platform.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Dashboard</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/calendar">Calendar</a></li>
              <li><a href="/tasks">Tasks</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Event Scheduler. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
