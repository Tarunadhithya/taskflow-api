// ============================================
// Mongoose Task Model - MongoDB Schema
// ============================================
// Task 4: Database Integration with MongoDB/Mongoose
// Production-ready data model with validation and indexing

import mongoose from 'mongoose';

// Define Task Schema with validation rules
const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Task text is required'],
    trim: true,
    minlength: [3, 'Task text must be at least 3 characters'],
    maxlength: [255, 'Task text cannot exceed 255 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: false, updatedAt: 'lastModified' }
});

// ============================================
// Indexes for Performance Optimization
// ============================================

// Text search index for searching tasks by text content
taskSchema.index({ text: 'text' });

// Compound index for filtering completed/incomplete tasks and sorting by date
taskSchema.index({ completed: 1, createdAt: -1 });

// ============================================
// Middleware Hooks
// ============================================

// Update lastModified timestamp before save
taskSchema.pre('save', function(next) {
  this.lastModified = Date.now();
  next();
});

// ============================================
// Model Export
// ============================================

const Task = mongoose.model('Task', taskSchema);

export default Task;
