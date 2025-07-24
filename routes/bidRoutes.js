const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authMiddleware = require('../middleware/authMiddleware');

// Submit bid (freelancer only)
router.post('/', authMiddleware, bidController.submitBid);

// Get bids for a job (client can view bids)
router.get('/:jobId', bidController.getBidsForJob);

module.exports = router;
