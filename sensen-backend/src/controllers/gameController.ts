import { Request, Response } from 'express';
import Game, { IGame } from '../models/Game';

// Get all games
export const getAllGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error });
  }
};

// Get a single game by slug
export const getGameBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const game = await Game.findOne({ slug: req.params.slug });
    if (!game) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game', error });
  }
};

// Create a new game
export const createGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const newGame: IGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    // Handle duplicate slug error
    if (error instanceof Error && error.message.includes('duplicate key error') && error.message.includes('slug')) {
      res.status(409).json({ message: 'A game with this slug already exists.' });
    } else {
      res.status(500).json({ message: 'Error creating game', error });
    }
  }
};

// Update an existing game
export const updateGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const updatedGame = await Game.findOneAndUpdate({ slug }, req.body, { new: true, runValidators: true });

    if (!updatedGame) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    // Handle duplicate slug error during update
    if (error instanceof Error && error.message.includes('duplicate key error') && error.message.includes('slug')) {
      res.status(409).json({ message: 'A game with this slug already exists.' });
    } else {
      res.status(500).json({ message: 'Error updating game', error });
    }
  }
};

// Delete a game
export const deleteGame = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const deletedGame = await Game.findOneAndDelete({ slug });

    if (!deletedGame) {
      res.status(404).json({ message: 'Game not found' });
      return;
    }
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting game', error });
  }
};
