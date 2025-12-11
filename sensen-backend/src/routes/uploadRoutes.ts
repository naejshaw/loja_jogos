import { Router } from 'express';
import { uploadImage, imageUploadMiddleware, uploadVideo, videoUploadMiddleware } from '../controllers/uploadController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// @route   POST /api/upload/image
// @desc    Upload an image file
// @access  Private (admin only)
router.post('/image', protect, imageUploadMiddleware, uploadImage);

// @route   POST /api/upload/video
// @desc    Upload a video file
// @access  Private (admin only)
router.post('/video', protect, videoUploadMiddleware, uploadVideo);

export default router;
