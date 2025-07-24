const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Freelancer dashboard: Get bids submitted by freelancer
router.get('/:id/bids', authMiddleware, userController.getFreelancerBids);

// Client dashboard: Get jobs posted by client
router.get('/:id/jobs', authMiddleware, userController.getClientJobs);

module.exports = router;
