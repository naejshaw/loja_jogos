"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const User_1 = __importDefault(require("../models/User"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const createAdmin = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        console.error('MONGODB_URI not found in .env file');
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected for admin creation...');
        const adminUsername = 'admin';
        const adminPassword = 'password123';
        // Always delete existing admin user to ensure a fresh start
        console.log(`Attempting to delete existing admin user '${adminUsername}'...`);
        await User_1.default.deleteMany({ username: adminUsername });
        console.log('Existing admin user (if any) deleted.');
        // Create new admin user
        console.log(`Creating admin user '${adminUsername}'...`);
        await User_1.default.create({
            username: adminUsername,
            password: adminPassword, // The pre-save hook will hash this
        });
        console.log(`Admin user '${adminUsername}' created successfully with password 'password123'.`);
    }
    catch (error) {
        console.error('Error during admin user creation:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('MongoDB disconnected.');
    }
};
createAdmin();
