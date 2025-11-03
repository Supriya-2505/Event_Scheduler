import React, { useState, useEffect } from 'react';
import SummaryCard from '../components/Shared/SummaryCard';
import UpcomingEventsWidget from '../components/Shared/UpcomingEventsWidget';
import QuickLinks from '../components/Shared/QuickLinks';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch dashboard stats
      const statsResponse = await api.get('/dashboard/stats');
      if (!statsResponse.data) {
        throw new Error('No data received from server');
      }
      
      const stats = statsResponse.data;
      
      // Fetch upcoming events
      const upcomingResponse = await api.get('/dashboard/upcoming-events');
      setUpcomingEvents(upcomingResponse.data || []);
      
      // Transform stats into summary data format
      const transformedSummaryData = [
        {
          title: 'TOTAL EVENTS',
          value: stats.totalEvents.toString(),
          icon: '📊',
          color: '#4285f4',
          trend: 6, // Percentage increase
          trendLabel: 'vs last month'
        },
        {
          title: 'Upcoming Events',
          value: stats.upcomingEvents.toString(),
          icon: '📅',
          color: 'green',
          trend: stats.upcomingEvents > 0 ? 1 : 0,
          trendValue: stats.upcomingEvents
        },
        {
          title: 'Pending Tasks',
          value: stats.pendingTasks.toString(),
          icon: '✅',
          color: 'orange',
          trend: stats.overdueTasks > 0 ? -1 : 1,
          trendValue: stats.pendingTasks
        },
        {
          title: 'Completed Tasks',
          value: stats.completedTasks.toString(),
          icon: '🎯',
          color: 'purple',
          trend: stats.completedTasks > 0 ? 1 : 0,
          trendValue: stats.completedTasks
        }
      ];
      
      setSummaryData(transformedSummaryData);
      
      // Fetch upcoming events
      const eventsResponse = await api.get('/events/upcoming');
      const events = eventsResponse.data.slice(0, 5);
      
      // Transform events to match the expected format
      const transformedEvents = events.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time || 'All day',
        location: event.location || 'No location specified',
        status: String(event.status || '').toLowerCase() || 'pending'
      }));
      
      setUpcomingEvents(transformedEvents);
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Using sample data.');
      
      // Fall back to sample data if API fails
      setSummaryData([
        {
          title: 'Total Events',
          value: '6',
          icon: '🎉',
          color: 'blue',
          trend: 1,
          trendValue: 6
        },
        {
          title: 'Upcoming Events',
          value: '4',
          icon: '📅',
          color: 'green',
          trend: 1,
          trendValue: 4
        },
        {
          title: 'Pending Tasks',
          value: '8',
          icon: '✅',
          color: 'orange',
          trend: -1,
          trendValue: 8
        },
        {
          title: 'Completed Tasks',
          value: '3',
          icon: '🎯',
          color: 'purple',
          trend: 1,
          trendValue: 3
        }
      ]);
      
      setUpcomingEvents([
        {
          id: 1,
          title: 'Team Meeting',
          date: '2024-01-15',
          time: '10:00 AM',
          location: 'Conference Room A',
          status: 'confirmed'
        },
        {
          id: 2,
          title: 'Project Presentation',
          date: '2024-01-16',
          time: '2:00 PM',
          location: 'Main Hall',
          status: 'pending'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Loading your dashboard...</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your events.</p>
        {error && (
          <div className="error-banner">
            {error}
            <button 
              className="retry-btn" 
              onClick={fetchDashboardData}
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="dashboard-content">
        <div className="summary-cards">
          {summaryData.map((data, index) => (
            <SummaryCard
              key={index}
              title={data.title}
              value={data.value}
              icon={data.icon}
              color={data.color}
              trend={data.trend}
              trendValue={data.trendValue}
            />
          ))}
        </div>

        <div className="dashboard-widgets">
          <div className="widget-column">
            <UpcomingEventsWidget events={upcomingEvents} />
          </div>
          
          <div className="widget-column">
            <QuickLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;