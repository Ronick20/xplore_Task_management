import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import '../styles/Components.css';

const TasksList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getTasks(token);
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await adminAPI.deleteTask(taskId, token);
        fetchTasks();
        alert('Task deleted successfully!');
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  const filteredTasks = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

  if (loading) return <div className="loading">Loading tasks...</div>;

  const statusCounts = {
    Pending: tasks.filter((t) => t.status === 'Pending').length,
    'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
    Completed: tasks.filter((t) => t.status === 'Completed').length,
  };

  return (
    <div className="tasks-list-container">
      <h2>All Tasks</h2>

      <div className="filter-section">
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

        <div className="filter-buttons">
          {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {filteredTasks.length === 0 ? (
        <p className="no-data">No tasks found</p>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`status-badge status-${task.status.replace(' ', '-').toLowerCase()}`}>
                  {task.status}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-details">
                <p><strong>Assigned to:</strong> {task.assignedTo?.name}</p>
                <p><strong>Email:</strong> {task.assignedTo?.email}</p>
                <p><strong>Department:</strong> {task.assignedTo?.department}</p>
                <p><strong>Priority:</strong> <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span></p>
                <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDelete(task._id)}
                className="btn btn-danger btn-small"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;
