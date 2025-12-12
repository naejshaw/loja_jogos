"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingsController_1 = require("../controllers/settingsController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   GET /api/settings
// @desc    Get site settings
// @access  Public
router.get('/', settingsController_1.getSettings);
// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private (admin only)
router.put('/', authMiddleware_1.protect, settingsController_1.updateSettings);
exports.default = router;
