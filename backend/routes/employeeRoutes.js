const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Task = require('../models/Task');
const { authMiddleware, employeeMiddleware } = require('../middleware/auth');

// Employee Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, department } = req.body;

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new employee
    const employee = new Employee({
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      isApproved: false,
    });

    await employee.save();

    res.status(201).json({
      message: 'Registration successful. Please wait for admin approval.',
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        department: employee.department,
        isApproved: employee.isApproved,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Employee Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find employee
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if approved
    if (!employee.isApproved) {
      return res.status(403).json({ 
        message: 'Your account is pending admin approval. Please contact the administrator.' 
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: employee._id, role: 'employee', email: employee.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        department: employee.department,
        role: employee.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Get assigned tasks for employee
router.get('/tasks', authMiddleware, employeeMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate('assignedBy', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update task status
router.put('/tasks/:id/status', authMiddleware, employeeMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Verify task belongs to employee
    const task = await Task.findById(req.params.id);
    if (!task || task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    task.status = status;
    task.updatedAt = new Date();
    await task.save();

    res.json({
      message: 'Task status updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get employee profile
router.get('/profile', authMiddleware, employeeMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select('-password');
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
