const express = require('express');
const router = express.Router();
const { postJob } = require('../controllers/jobController');
const authenticateToken = require('../middleware/auth');

router.post('/jobs', authenticateToken, postJob);
module.exports = router;
router.get('/jobs', authenticateToken, getJobs);
router.get('/jobs/search', authenticateToken, searchJobs);

