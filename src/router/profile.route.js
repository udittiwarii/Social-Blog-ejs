const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const profileController = require("../controller/profile.controller");

// Protected routes - require authentication
router.get("/", authMiddleware, profileController.getProfile);
router.get("/edit", authMiddleware, profileController.getEditProfilePage);
router.post("/edit", authMiddleware, upload.single("profilePic"), profileController.updateProfile);
router.get("/:username", profileController.getUserProfile);

module.exports = router;
