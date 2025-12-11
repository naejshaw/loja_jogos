import dotenv from 'dotenv';
dotenv.config(); // Moved to the very top

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path'; // Import path module
import gameRoutes from './routes/gameRoutes'; // Import game routes
import authRoutes from './routes/authRoutes'; // Import auth routes
import settingsRoutes from './routes/settingsRoutes'; // Import settings routes
import uploadRoutes from './routes/uploadRoutes'; // Import upload routes
import { MulterError } from 'multer'; // Import MulterError

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sensen-games'; // Default fallback

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

connectDB(); // Connect to DB before starting server

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Use auth routes
app.use('/api/auth', authRoutes);
// Use game routes
app.use('/api/games', gameRoutes);
// Use settings routes
app.use('/api/settings', settingsRoutes);
// Use upload routes
app.use('/api/upload', uploadRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Sensen Backend is running!');
});

// Multer error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'O arquivo é muito grande. Tamanho máximo permitido é 200MB para vídeos e 5MB para imagens.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Campo de arquivo inesperado.' });
    }
    // Generic Multer error
    return res.status(400).json({ message: err.message });
  }
  // Other errors
  next(err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
