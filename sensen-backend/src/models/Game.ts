import { Schema, model, Document } from 'mongoose';

// Define the interface for a Game document
export interface IGame extends Document {
  title: string;
  slug: string;
  image: string;
  video: string;
  description: string;
  detailedDescription: string; // New
  developer: string; // New
  price: number; // New - Changed to number for better querying
  genre: string[]; // New
  rating: number; // New
  releaseDate: Date; // New
  players: string; // New
  platforms: string[];
  storeLinks: Map<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose schema for a Game
const gameSchema = new Schema<IGame>(
  {
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
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create and export the Game model
const Game = model<IGame>('Game', gameSchema);

export default Game;
