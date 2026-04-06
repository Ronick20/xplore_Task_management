import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import EmployeeRegistrations from '../components/EmployeeRegistrations';
import TaskAssignment from '../components/TaskAssignment';
import TasksList from '../components/TasksList';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('registrations');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === 'registrations' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrations')}
        >
          Employee Registrations
        </button>
        <button
          className={`nav-btn ${activeTab === 'assign' ? 'active' : ''}`}
          onClick={() => setActiveTab('assign')}
        >
          Assign Task
        </button>
        <button
          className={`nav-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          All Tasks
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'registrations' && <EmployeeRegistrations />}
        {activeTab === 'assign' && <TaskAssignment />}
        {activeTab === 'tasks' && <TasksList />}
      </main>
    </div>
  );
};

export default AdminDashboard;
