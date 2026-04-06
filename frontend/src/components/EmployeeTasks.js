import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { employeeAPI } from '../services/api';
import '../styles/Components.css';

const EmployeeTasks = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await employeeAPI.getTasks(token);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    setUpdatingId(taskId);
    try {
      await employeeAPI.updateTaskStatus(taskId, newStatus, token);
      fetchTasks();
      alert('Task status updated successfully!');
    } catch (err) {
      alert('Failed to update task status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="loading">Loading your tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  const statusCounts = {
    Pending: tasks.filter((t) => t.status === 'Pending').length,
    'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
    Completed: tasks.filter((t) => t.status === 'Completed').length,
  };

  return (
    <div className="employee-tasks-container">
      <h2>Your Assigned Tasks</h2>

      <div className="status-stats">
        <div className="stat">
          <span className="stat-label">Total Tasks:</span>
          <span className="stat-value">{tasks.length}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Pending:</span>
          <span className="stat-value">{statusCounts.Pending}</span>
        </div>
        <div className="stat">
          <span className="stat-label">In Progress:</span>
          <span className="stat-value">{statusCounts['In Progress']}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Completed:</span>
          <span className="stat-value">{statusCounts.Completed}</span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="no-data">No tasks assigned yet</p>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status-badge status-${task.status.replace(' ', '-').toLowerCase()}`}>
                  {task.status}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-details">
                <p><strong>Assigned by:</strong> {task.assignedBy?.name}</p>
                <p><strong>Priority:</strong> <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span></p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <div className="task-actions">
                <label htmlFor={`status-${task._id}`}>Update Status:</label>
                <select
                  id={`status-${task._id}`}
                  value={task.status}
                  onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                  disabled={updatingId === task._id}
                  className="status-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTasks;
