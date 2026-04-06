import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { employeeAPI } from '../services/api';
import EmployeeTasks from '../components/EmployeeTasks';
import '../styles/Dashboard.css';

const EmployeeDashboard = () => {
  const { logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployeeProfile();
  }, []);

  const fetchEmployeeProfile = async () => {
    try {
      const response = await employeeAPI.getProfile(token);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {employee?.name}</h1>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        {employee && (
          <div className="profile-section">
            <h2>Your Profile</h2>
            <div className="profile-info">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Status:</strong> {employee.isApproved ? 'Approved' : 'Pending Approval'}</p>
            </div>
          </div>
        )}

        <EmployeeTasks />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
