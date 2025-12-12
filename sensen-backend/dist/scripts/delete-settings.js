"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Settings_1 = __importDefault(require("../models/Settings")); // Import the Settings model
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const deleteSettings = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        console.error('MONGODB_URI not found in .env file');
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected for deleting settings...');
        console.log('Deleting existing settings document...');
        const result = await Settings_1.default.deleteOne({}); // Delete the single settings document
        if (result.deletedCount === 1) {
            console.log('Settings document deleted successfully.');
        }
        else {
            console.log('No settings document found to delete.');
        }
    }
    catch (error) {
        console.error('Error during settings deletion:', error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log('MongoDB disconnected.');
    }
};
deleteSettings();
