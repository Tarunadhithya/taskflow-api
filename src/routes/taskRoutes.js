// ============================================
// Task Routes - RESTful API Endpoints
// ============================================
// Description: Defines all HTTP routes for task operations
// Maps HTTP methods and URLs to controller functions

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// ============================================
// Route Definitions
// ============================================

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks
 * @access  Public
 * @returns {Array} List of all tasks with count
 */
router.get('/', taskController.getTasks);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task by ID
 * @access  Public
 * @returns {Object} Single task object
 */
router.get('/:id', taskController.getTask);

/**
 * @route   POST /api/tasks
 * @desc    Create new task
 * @access  Public
 * @body    {text: string, completed: boolean}
 * @returns {Object} Newly created task
 */
router.post('/', taskController.createTask);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update existing task
 * @access  Public
 * @body    {text: string, completed: boolean}
 * @returns {Object} Updated task
 */
router.put('/:id', taskController.updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 * @access  Public
 * @returns {null} 204 No Content
 */
router.delete('/:id', taskController.deleteTask);

// ============================================
// Development/Testing Helper Routes
// ============================================

/**
 * @route   DELETE /api/tasks
 * @desc    Reset all tasks (for testing)
 * @access  Development only
 * @returns {Object} Success message
 */
router.delete('/', taskController.resetTasks);

module.exports = router;
