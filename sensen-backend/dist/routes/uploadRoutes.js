"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = require("../controllers/uploadController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   POST /api/upload/image
// @desc    Upload an image file
// @access  Private (admin only)
router.post('/image', authMiddleware_1.protect, uploadController_1.imageUploadMiddleware, uploadController_1.uploadImage);
// @route   POST /api/upload/video
// @desc    Upload a video file
// @access  Private (admin only)
router.post('/video', authMiddleware_1.protect, uploadController_1.videoUploadMiddleware, uploadController_1.uploadVideo);
exports.default = router;
