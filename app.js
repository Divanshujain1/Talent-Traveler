
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const jobRoutes = require('./routes/jobRoutes');

// Initialize dotenv
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests (React frontend)
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api', authRoutes);     // /api/signup, /api/login
app.use('/api', profileRoutes);  // /api/profile
app.use('/api', jobRoutes);   // Uncomment when job routes ready

// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is running - Freelancer Marketplace');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
