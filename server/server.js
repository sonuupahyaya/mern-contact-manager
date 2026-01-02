require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-url.vercel.app'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Contact Management API is running',
    version: '1.0.0',
    endpoints: {
      contacts: '/api/contacts',
    },
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/contacts', contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
