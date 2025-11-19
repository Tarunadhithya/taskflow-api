// ============================================
// MongoDB Database Connection - Mongoose
// ============================================
// Task 4: Database Integration
// Production-ready MongoDB Atlas connection with error handling

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ============================================
// Database Connection Function
// ============================================

const connectDB = async () => {
  try {
    // Connect to MongoDB Atlas with production-ready options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,     // Timeout after 5 seconds
      socketTimeoutMS: 45000,              // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10,                     // Maximum 10 simultaneous connections
      minPoolSize: 2                       // Maintain at least 2 connections
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Connection event listeners for production monitoring
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`❌ Mongoose connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Mongoose disconnected from MongoDB');
    });

  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    console.error('Full error:', error);
    
    // Exit process with failure in production
    process.exit(1);
  }
};

// ============================================
// Graceful Shutdown Handler
// ============================================

// Handle application termination gracefully
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during graceful shutdown:', error);
    process.exit(1);
  }
});

export default connectDB;
