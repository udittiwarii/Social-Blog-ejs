const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const postController = require("../controller/post.controller");

// Protected routes - require authentication
router.get("/compose", authMiddleware, postController.getComposePage);
router.post("/create", authMiddleware, upload.single("image"), postController.createPost);

module.exports = router;
