import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// @route   GET /api/settings
// @desc    Get site settings
// @access  Public
router.get('/', getSettings);

// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private (admin only)
router.put('/', protect, updateSettings);

export default router;
