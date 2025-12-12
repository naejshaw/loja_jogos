"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
const Game_1 = __importDefault(require("../models/Game"));
// Data from the frontend project. In a real-world scenario, you might read this from a JSON file.
const gamesData = [
    {
        id: 1,
        title: 'Typomancer',
        slug: 'typomancer',
        image: '/images/game1_cover.jpg',
        video: '',
        description: 'An action-packed adventure in a dystopian future.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 2,
        title: 'Tyfortress',
        slug: 'tyfortress',
        image: '/images/game2_cover.jpg',
        video: '/videos/game2_preview.mp4',
        description: 'Explore an enchanted forest and uncover its secrets.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 3,
        title: 'Tybot Invasion',
        slug: 'tybot-invasion',
        image: '/images/game3_cover.jpg',
        video: '/videos/game3_preview.mp4',
        description: 'Race against the best pilots in the galaxy.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 4,
        title: 'Smashing Spirits',
        slug: 'smashing-spirits',
        image: '/images/game4_cover.jpg',
        video: '/videos/game4_preview.mp4',
        description: 'Defend your city from hordes of zombies.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 5,
        title: 'Neon Ships',
        slug: 'neon-ships',
        image: '/images/game5_cover.jpg',
        video: '',
        description: 'Discover the mysteries of the deep ocean.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 6,
        title: 'Kings Bullseye',
        slug: 'kings-bullseye',
        image: '/images/game6_cover.jpg',
        video: '/videos/game6_preview.mp4',
        description: 'Soar through the skies in this aerial combat game.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 7,
        title: 'Akuma Bloodrain',
        slug: 'akuma-bloodrain',
        image: '/images/game7_cover.jpg',
        video: '/videos/game7_preview.mp4',
        description: 'A mind-bending puzzle game about time travel.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 8,
        title: 'Sniper Ships',
        slug: 'sniper-ships',
        image: '/images/game8_cover.jpg',
        video: '/videos/game8_preview.mp4',
        description: 'Explore endless dungeons and fight mythical creatures.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
    {
        id: 9,
        title: 'Spooky Typing',
        slug: 'spooky-typing',
        image: '/images/game9_cover.jpg',
        video: '',
        description: 'A stealth-action game where you play as a shapeshifter.',
        platforms: ['PC'],
        storeLinks: {
            steam: '#',
        },
    },
];
const seedDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        console.error('MONGODB_URI not found in .env file');
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected for seeding...');
        // Clear existing data
        console.log('Deleting existing game data...');
        await Game_1.default.deleteMany({});
        console.log('Existing game data deleted.');
        // Insert new data
        console.log('Inserting new game data...');
        await Game_1.default.insertMany(gamesData);
        console.log('New game data inserted successfully.');
    }
    catch (error) {
        console.error('Error seeding the database:', error);
    }
    finally {
        // Disconnect from the database
        await mongoose_1.default.disconnect();
        console.log('MongoDB disconnected.');
    }
};
seedDB();
