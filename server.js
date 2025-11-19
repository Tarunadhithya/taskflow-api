// ====================================
// TaskFlow API - Server Entry Point
// ====================================

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import taskRoutes from './src/routes/taskRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===================
// Middleware Pipeline
// ===================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// HTTP request logging
app.use(morgan('dev'));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// ===================
// API Routes
// ===================

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'TaskFlow API is running',
        version: '1.0.0',
        endpoints: {
            tasks: '/api/tasks',
            health: '/health'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// ===================
// Error Handling
// ===================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.url} not found`,
        availableEndpoints: ['/api/tasks', '/health']
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ===================
// Server Startup
// ===================

app.listen(PORT, () => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`\u2713 TaskFlow API Server Running`);
    console.log(`${'='.repeat(50)}`);
    console.log(`\u27a2 Port: ${PORT}`);
    console.log(`\u27a2 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`\u27a2 Timestamp: ${new Date().toLocaleString()}`);
    console.log(`${'='.repeat(50)}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\nSIGTERM signal received: closing HTTP server');
    process.exit(0);
});

export default app;
