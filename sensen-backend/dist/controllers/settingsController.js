"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const Settings_1 = __importDefault(require("../models/Settings"));
// @route   GET /api/settings
// @desc    Get site settings
// @access  Public (frontend needs to read it)
const getSettings = async (req, res) => {
    try {
        // Find the single settings document, or create one if it doesn't exist
        let settings = await Settings_1.default.findOne();
        if (!settings) {
            settings = await Settings_1.default.create({}); // Create with default values
        }
        res.status(200).json(settings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error });
    }
};
exports.getSettings = getSettings;
// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private (admin only)
const updateSettings = async (req, res) => {
    try {
        // Find the single settings document (or create if not found) and update it
        let settings = await Settings_1.default.findOneAndUpdate({}, req.body, {
            new: true, // Return the updated document
            upsert: true, // Create if no document matches the filter ({})
            runValidators: true, // Run schema validators
        });
        res.status(200).json(settings);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating settings', error });
    }
};
exports.updateSettings = updateSettings;
