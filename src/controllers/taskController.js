// ========================================
// Task Controller - Business Logic
// ========================================

// In-memory data store (will be replaced with database in Task 4)
let tasks = [];
let currentId = 1;

// Utility function to find task by ID
const findTaskById = (id) => tasks.find(task => task.id === id);
const findTaskIndex = (id) => tasks.findIndex(task => task.id === id);

// ========================================
// GET /api/tasks - Get all tasks
// ========================================
export const getTasks = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// ========================================
// GET /api/tasks/:id - Get single task
// ========================================
export const getTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = findTaskById(id);

        if (!task) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: `Task with id ${id} not found`
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// ========================================
// POST /api/tasks - Create new task
// ========================================
export const createTask = (req, res) => {
    try {
        const { text } = req.body;

        // Validation
        if (!text || text.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Task text is required'
            });
        }

        if (text.length > 200) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                message: 'Task text must be 200 characters or less'
            });
        }

        // Create new task
        const newTask = {
            id: currentId++,
            text: text.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        tasks.push(newTask);

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// ========================================
// PUT /api/tasks/:id - Update task
// ========================================
export const updateTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const taskIndex = findTaskIndex(id);

        if (taskIndex === -1) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: `Task with id ${id} not found`
            });
        }

        const { text, completed } = req.body;

        // Validation
        if (text !== undefined) {
            if (text.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    message: 'Task text cannot be empty'
                });
            }
            if (text.length > 200) {
                return res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    message: 'Task text must be 200 characters or less'
                });
            }
        }

        // Update task
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            text: text !== undefined ? text.trim() : tasks[taskIndex].text,
            completed: completed !== undefined ? completed : tasks[taskIndex].completed,
            updatedAt: new Date().toISOString()
        };

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: tasks[taskIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// ========================================
// DELETE /api/tasks/:id - Delete task
// ========================================
export const deleteTask = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const initialLength = tasks.length;
        
        tasks = tasks.filter(task => task.id !== id);

        if (tasks.length === initialLength) {
            return res.status(404).json({
                success: false,
                error: 'Not Found',
                message: `Task with id ${id} not found`
            });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error',
            message: error.message
        });
    }
};

// ========================================
// Helper function to reset tasks (for testing)
// ========================================
export const resetTasks = () => {
    tasks = [];
    currentId = 1;
};
