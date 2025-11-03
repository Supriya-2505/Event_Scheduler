import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import Sidebar from './components/Shared/Sidebar';
import Footer from './components/Shared/Footer';
import PrivateRoute from './components/Shared/PrivateRoute';
import Dashboard from './pages/Dashboard';
import EventPage from './pages/EventPage';
import CalendarPage from './pages/CalendarPage';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="app">
        {token && <Navbar />}
        <div className={token ? "app-content" : ""}>
          {token && <Sidebar />}
          <main className={token ? "main-content" : ""}>
            <Routes>
              <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/events" element={
                <PrivateRoute>
                  <EventPage />
                </PrivateRoute>
              } />
              <Route path="/calendar" element={
                <PrivateRoute>
                  <CalendarPage />
                </PrivateRoute>
              } />
              <Route path="/tasks" element={
                <PrivateRoute>
                  <TaskPage />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
            </Routes>
          </main>
        </div>
        {token && <Footer />}
      </div>
    </Router>
  );
}

export default App;
