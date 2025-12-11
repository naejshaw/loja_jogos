import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Settings from '../models/Settings'; // Import the Settings model

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const deleteSettings = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for deleting settings...');

    console.log('Deleting existing settings document...');
    const result = await Settings.deleteOne({}); // Delete the single settings document
    if (result.deletedCount === 1) {
      console.log('Settings document deleted successfully.');
    } else {
      console.log('No settings document found to delete.');
    }
  } catch (error) {
    console.error('Error during settings deletion:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

deleteSettings();
