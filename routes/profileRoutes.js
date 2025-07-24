const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
router.put("/:id", profileController.updateUserProfile); // /api/profile/:id

router.get("/:id", profileController.getUserProfile); // /api/profile/:id

module.exports = router;
