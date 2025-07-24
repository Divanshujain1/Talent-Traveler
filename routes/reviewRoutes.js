const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to submit review (client only)
router.post('/', authMiddleware, reviewController.submitReview);

// Get reviews for a freelancer
router.get('/:freelancer_id', reviewController.getFreelancerReviews);

module.exports = router;
