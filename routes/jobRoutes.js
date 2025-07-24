// const express = require('express');
// const router = express.Router();
// const { postJob } = require('../controllers/jobController');
// const authenticateToken = require('../middleware/auth');

// router.post('/jobs', authenticateToken, postJob);
// module.exports = router;
// router.get('/jobs', authenticateToken, getJobs);
// router.get('/jobs/search', authenticateToken, searchJobs);


const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware"); // to protect postJob
router.put('/hire', authMiddleware, jobController.hireFreelancer);


// POST /api/jobs → Only logged-in clients can post jobs
router.post("/", authMiddleware, jobController.postJob);

// GET /api/jobs → Get all open jobs
router.get("/", jobController.getJobs);

// GET /api/jobs/search?skill=React → Search jobs by skill
router.get("/search", jobController.searchJobs);

module.exports = router;

