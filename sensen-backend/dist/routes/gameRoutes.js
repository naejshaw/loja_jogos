"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gameController_1 = require("../controllers/gameController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// @route   GET api/games
// @desc    Get all games
// @access  Public
router.get('/', gameController_1.getAllGames);
// @route   GET api/games/:slug
// @desc    Get a single game by slug
// @access  Public
router.get('/:slug', gameController_1.getGameBySlug);
// @route   POST api/games
// @desc    Create a new game
// @access  Private
router.post('/', authMiddleware_1.protect, gameController_1.createGame);
// @route   PUT api/games/:slug
// @desc    Update an existing game
// @access  Private
router.put('/:slug', authMiddleware_1.protect, gameController_1.updateGame);
// @route   DELETE api/games/:slug
// @desc    Delete a game
// @access  Private
router.delete('/:slug', authMiddleware_1.protect, gameController_1.deleteGame);
exports.default = router;
