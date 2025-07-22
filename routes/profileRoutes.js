const express = require('express');
const router = express.Router();
const { createOrUpdateProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/auth');

router.post('/profile', authenticateToken, createOrUpdateProfile);
module.exports = router;
