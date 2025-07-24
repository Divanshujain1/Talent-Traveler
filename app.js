
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const bidRoutes = require('./routes/bidRoutes');
const reviewRoutes = require('./routes/reviewRoutes');



// Initialize dotenv
dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests (React frontend)
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api', authRoutes);     // /api/signup, /api/login

app.use('/api/jobs', jobRoutes);
app.use('/api/profile', profileRoutes); // ✅ Profile routes mounted here
app.use('/api/bids', bidRoutes);  // bid routes
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('✅ Backend is running - Freelancer Marketplace');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
