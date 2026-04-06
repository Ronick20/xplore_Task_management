import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Admin API calls
export const adminAPI = {
  login: (email, password) =>
    axios.post(`${API_BASE_URL}/admin/login`, { email, password }),
  
  getEmployees: (token) =>
    axios.get(`${API_BASE_URL}/admin/employees`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  approveEmployee: (employeeId, token) =>
    axios.put(`${API_BASE_URL}/admin/employees/${employeeId}/approve`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  rejectEmployee: (employeeId, token) =>
    axios.put(`${API_BASE_URL}/admin/employees/${employeeId}/reject`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  assignTask: (taskData, token) =>
    axios.post(`${API_BASE_URL}/admin/tasks/assign`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  getTasks: (token) =>
    axios.get(`${API_BASE_URL}/admin/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  deleteTask: (taskId, token) =>
    axios.delete(`${API_BASE_URL}/admin/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Employee API calls
export const employeeAPI = {
  register: (userData) =>
    axios.post(`${API_BASE_URL}/employee/register`, userData),
  
  login: (email, password) =>
    axios.post(`${API_BASE_URL}/employee/login`, { email, password }),
  
  getProfile: (token) =>
    axios.get(`${API_BASE_URL}/employee/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  getTasks: (token) =>
    axios.get(`${API_BASE_URL}/employee/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  
  updateTaskStatus: (taskId, status, token) =>
    axios.put(`${API_BASE_URL}/employee/tasks/${taskId}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
