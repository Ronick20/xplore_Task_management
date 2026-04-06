import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Task Management System</h1>
        <p>Efficient task management for administrators and employees</p>
      </header>

      <div className="landing-content">
        <div className="card admin-card">
          <h2>Admin Portal</h2>
          <p>Manage employee registrations, approvals, and task assignments</p>
          <ul>
            <li>View employee registrations</li>
            <li>Approve employee access</li>
            <li>Assign tasks to employees</li>
            <li>Track task progress</li>
          </ul>
          <Link to="/admin/login" className="btn btn-primary">
            Admin Login
          </Link>
        </div>

        <div className="card employee-card">
          <h2>Employee Portal</h2>
          <p>Register, log in, and manage your assigned tasks</p>
          <ul>
            <li>Register for an account</li>
            <li>Wait for admin approval</li>
            <li>View assigned tasks</li>
            <li>Update task status</li>
          </ul>
          <div className="card-buttons">
            <Link to="/employee/register" className="btn btn-secondary">
              Register
            </Link>
            <Link to="/employee/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;