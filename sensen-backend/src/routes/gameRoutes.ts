import { Router } from 'express';
import { getAllGames, getGameBySlug, createGame, updateGame, deleteGame } from '../controllers/gameController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// @route   GET api/games
// @desc    Get all games
// @access  Public
router.get('/', getAllGames);

// @route   GET api/games/:slug
// @desc    Get a single game by slug
// @access  Public
router.get('/:slug', getGameBySlug);

// @route   POST api/games
// @desc    Create a new game
// @access  Private
router.post('/', protect, createGame);

// @route   PUT api/games/:slug
// @desc    Update an existing game
// @access  Private
router.put('/:slug', protect, updateGame);

// @route   DELETE api/games/:slug
// @desc    Delete a game
// @access  Private
router.delete('/:slug', protect, deleteGame);

export default router;
