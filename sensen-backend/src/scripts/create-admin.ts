import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/User';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const createAdmin = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found in .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for admin creation...');

    const adminUsername = 'admin';
    const adminPassword = 'password123';

    // Always delete existing admin user to ensure a fresh start
    console.log(`Attempting to delete existing admin user '${adminUsername}'...`);
    await User.deleteMany({ username: adminUsername });
    console.log('Existing admin user (if any) deleted.');

    // Create new admin user
    console.log(`Creating admin user '${adminUsername}'...`);
    await User.create({
      username: adminUsername,
      password: adminPassword, // The pre-save hook will hash this
    });
    console.log(`Admin user '${adminUsername}' created successfully with password 'password123'.`);
  } catch (error) {
    console.error('Error during admin user creation:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

createAdmin();
