// ==========================================
// Task Controller - MongoDB/Mongoose Version
// ==========================================

import Task from '../models/Task.js';
import mongoose from 'mongoose';

// ==========================================
// GET /api/tasks - Get all tasks
// ==========================================

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching tasks'
    });
  }
};

// ==========================================
// GET /api/tasks/:id - Get single task
// ==========================================

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID format'
      });
    }

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching task'
    });
  }
};

// ==========================================
// POST /api/tasks - Create new task
// ==========================================

export const createTask = async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Task text is required'
      });
    }

    const task = await Task.create({
      text: text.trim(),
      completed: false
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }

    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while creating task'
    });
  }
};

// ==========================================
// PUT /api/tasks/:id - Update task
// ==========================================

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID format'
      });
    }

    // Build update object
    const updateData = {};
    if (text !== undefined) updateData.text = text.trim();
    if (completed !== undefined) updateData.completed = completed;

    const task = await Task.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: errors.join(', ')
      });
    }

    // Handle cast errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data format'
      });
    }

    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating task'
    });
  }
};

// ==========================================
// DELETE /api/tasks/:id - Delete task
// ==========================================

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid task ID format'
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting task'
    });
  }
};
