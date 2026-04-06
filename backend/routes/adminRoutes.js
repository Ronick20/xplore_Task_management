const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Task = require('../models/Task');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Admin Login (with default admin creation)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    let admin = await Admin.findOne({ email });

    if (!admin) {
      // Create default admin if not exists
      if (email === 'admin@example.com' && password === 'admin123') {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        admin = new Admin({
          email,
          password: hashedPassword,
          name: 'Administrator',
        });
        await admin.save();
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, role: 'admin', email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all employee registrations (pending and approved)
router.get('/employees', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find().select('-password');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve employee registration
router.put('/employees/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        isApproved: true,
        approvedAt: new Date(),
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Employee approved successfully',
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject employee registration
router.put('/employees/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee rejected', employee });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assign task to employee
router.post('/tasks/assign', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, priority } = req.body;

    // Verify employee exists and is approved
    const employee = await Employee.findById(assignedTo);
    if (!employee || !employee.isApproved) {
      return res.status(400).json({ message: 'Employee not found or not approved' });
    }

    const task = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user.id,
      dueDate,
      priority,
    });

    await task.save();
    res.json({
      message: 'Task assigned successfully',
      task: await task.populate('assignedTo', 'name email'),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all tasks (admin view)
router.get('/tasks', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name email department')
      .populate('assignedBy', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete task (admin only)
router.delete('/tasks/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
