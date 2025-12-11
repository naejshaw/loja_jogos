import { Request, Response } from 'express';
import Settings from '../models/Settings';

// @route   GET /api/settings
// @desc    Get site settings
// @access  Public (frontend needs to read it)
export const getSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find the single settings document, or create one if it doesn't exist
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({}); // Create with default values
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
};

// @route   PUT /api/settings
// @desc    Update site settings
// @access  Private (admin only)
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find the single settings document (or create if not found) and update it
    let settings = await Settings.findOneAndUpdate({}, req.body, {
      new: true, // Return the updated document
      upsert: true, // Create if no document matches the filter ({})
      runValidators: true, // Run schema validators
    });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error });
  }
};
