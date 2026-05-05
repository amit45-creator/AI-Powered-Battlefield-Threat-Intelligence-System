const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: '../.env' });

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// --------------- Middleware ---------------
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// --------------- API Routes ---------------
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/threats', require('./routes/threatRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// --------------- Health Check ---------------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'operational',
    system: 'Battlefield Threat Intelligence System',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// --------------- Error Handling ---------------
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// --------------- Start Server ---------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════╗
  ║   🛡️  BATTLEFIELD THREAT INTELLIGENCE SYSTEM     ║
  ║   ⚡ Server running on port ${PORT}                ║
  ║   🌍 Environment: ${process.env.NODE_ENV || 'development'}              ║
  ║   📡 API: http://localhost:${PORT}/api              ║
  ╚══════════════════════════════════════════════════╝
  `);
});

module.exports = app;
