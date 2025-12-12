"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Mongoose schema for a Game
const gameSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    image: { type: String, default: '' },
    video: { type: String, default: '' },
    description: { type: String, required: true },
    detailedDescription: { type: String, default: '' }, // New
    developer: { type: String, default: '' }, // New
    price: { type: Number, default: 0 }, // New
    genre: [{ type: String }], // New
    rating: { type: Number, default: 0 }, // New
    releaseDate: { type: Date }, // New
    players: { type: String, default: '' }, // New
    platforms: [{ type: String }], // Array of strings
    storeLinks: {
        type: Map,
        of: String, // Map values are of type String
        default: {},
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});
// Create and export the Game model
const Game = (0, mongoose_1.model)('Game', gameSchema);
exports.default = Game;
