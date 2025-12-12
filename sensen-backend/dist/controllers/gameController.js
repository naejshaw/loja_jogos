"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.updateGame = exports.createGame = exports.getGameBySlug = exports.getAllGames = void 0;
const Game_1 = __importDefault(require("../models/Game"));
// Get all games
const getAllGames = async (req, res) => {
    try {
        const games = await Game_1.default.find();
        res.status(200).json(games);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching games', error });
    }
};
exports.getAllGames = getAllGames;
// Get a single game by slug
const getGameBySlug = async (req, res) => {
    try {
        const game = await Game_1.default.findOne({ slug: req.params.slug });
        if (!game) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }
        res.status(200).json(game);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching game', error });
    }
};
exports.getGameBySlug = getGameBySlug;
// Create a new game
const createGame = async (req, res) => {
    try {
        const newGame = new Game_1.default(req.body);
        await newGame.save();
        res.status(201).json(newGame);
    }
    catch (error) {
        // Handle duplicate slug error
        if (error instanceof Error && error.message.includes('duplicate key error') && error.message.includes('slug')) {
            res.status(409).json({ message: 'A game with this slug already exists.' });
        }
        else {
            res.status(500).json({ message: 'Error creating game', error });
        }
    }
};
exports.createGame = createGame;
// Update an existing game
const updateGame = async (req, res) => {
    try {
        const { slug } = req.params;
        const updatedGame = await Game_1.default.findOneAndUpdate({ slug }, req.body, { new: true, runValidators: true });
        if (!updatedGame) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }
        res.status(200).json(updatedGame);
    }
    catch (error) {
        // Handle duplicate slug error during update
        if (error instanceof Error && error.message.includes('duplicate key error') && error.message.includes('slug')) {
            res.status(409).json({ message: 'A game with this slug already exists.' });
        }
        else {
            res.status(500).json({ message: 'Error updating game', error });
        }
    }
};
exports.updateGame = updateGame;
// Delete a game
const deleteGame = async (req, res) => {
    try {
        const { slug } = req.params;
        const deletedGame = await Game_1.default.findOneAndDelete({ slug });
        if (!deletedGame) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }
        res.status(200).json({ message: 'Game deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting game', error });
    }
};
exports.deleteGame = deleteGame;
