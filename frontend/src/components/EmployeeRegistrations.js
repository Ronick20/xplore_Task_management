import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import '../styles/Components.css';

const EmployeeRegistrations = () => {
  const { token } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getEmployees(token);
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (employeeId) => {
    try {
      await adminAPI.approveEmployee(employeeId, token);
      fetchEmployees();
      alert('Employee approved successfully!');
    } catch (err) {
      alert('Failed to approve employee');
    }
  };

  const handleReject = async (employeeId) => {
    try {
      await adminAPI.rejectEmployee(employeeId, token);
      fetchEmployees();
      alert('Employee rejected');
    } catch (err) {
      alert('Failed to reject employee');
    }
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">{error}</div>;

  const pendingEmployees = employees.filter((e) => !e.isApproved);
  const approvedEmployees = employees.filter((e) => e.isApproved);

  return (
    <div className="registrations-container">
      <section className="registration-section">
        <h2>Pending Registrations ({pendingEmployees.length})</h2>
        {pendingEmployees.length === 0 ? (
          <p className="no-data">No pending registrations</p>
        ) : (
          <div className="table-wrapper">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>{new Date(employee.registeredAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleApprove(employee._id)}
                        className="btn btn-success btn-small"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(employee._id)}
                        className="btn btn-danger btn-small"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="registration-section">
        <h2>Approved Employees ({approvedEmployees.length})</h2>
        {approvedEmployees.length === 0 ? (
          <p className="no-data">No approved employees</p>
        ) : (
          <div className="table-wrapper">
            <table className="employees-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Approved</th>
                </tr>
              </thead>
              <tbody>
                {approvedEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.department}</td>
                    <td>{new Date(employee.approvedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default EmployeeRegistrations;
