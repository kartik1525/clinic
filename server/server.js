import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../client/dist');

// Initialize MongoDB connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: '*', // For demo flexibility; in production, restrict to process.env.CLIENT_URL
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes (Mounted with /api prefix and root fallback for maximum client compatibility)
app.use('/api/doctors', doctorRoutes);
app.use('/doctors', doctorRoutes);

app.use('/api/appointments', appointmentRoutes);
app.use('/appointments', appointmentRoutes);

// Health check endpoint (both /api/health and /health)
app.get(['/api/health', '/health'], (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'healthy',
    message: 'ApexCare Multispeciality Clinic (Lucknow) API service is operational',
    database: dbStatus,
    timestamp: new Date().toISOString(),
  });
});

// In production or all-in-one deployment, serve static frontend assets if built
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Root API info when running backend in standalone mode
  app.get('/', (req, res) => {
    res.json({
      name: 'ApexCare Multispeciality Clinic (Lucknow) Appointment API',
      version: '1.0.0',
      documentation: {
        health: 'GET /api/health',
        doctors: 'GET /api/doctors',
        appointments: 'GET /api/appointments',
        bookedSlots: 'GET /api/appointments/booked-slots?doctorId=...&date=...',
        bookAppointment: 'POST /api/appointments',
        updateStatus: 'PATCH /api/appointments/:id/status',
      },
    });
  });
}

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`[ApexCare Server] Running on http://localhost:${PORT}`);
  console.log(`[ApexCare Server] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
});

