import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads directory exists relative to the server's root
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and original extension
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Filter for image files
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!') as any, false);
  }
};

// Filter for video files
const videoFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed!') as any, false);
  }
};

// Initialize multer upload middleware for images
const uploadImageMiddleware = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB file size limit
  },
});

// Initialize multer upload middleware for videos
const uploadVideoMiddleware = multer({
  storage: storage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 200, // 200 MB file size limit for videos
  },
});

// @route   POST /api/upload/image
// @desc    Upload an image file
// @access  Private (admin only)
export const uploadImage = (req: Request, res: Response) => {
  if (req.file) {
    // Return the URL of the uploaded file
    // Assumes server is serving static files from /public
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
  } else {
    res.status(400).json({ message: 'No file uploaded.' });
  }
};

// @route   POST /api/upload/video
// @desc    Upload a video file
// @access  Private (admin only)
export const uploadVideo = (req: Request, res: Response) => {
  if (req.file) {
    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ url: fileUrl });
  } else {
    res.status(400).json({ message: 'No file uploaded.' });
  }
};

// Export the multer middleware for use in routes
export const imageUploadMiddleware = uploadImageMiddleware.single('image'); // 'image' is the field name for the file in the form
export const videoUploadMiddleware = uploadVideoMiddleware.single('video'); // 'video' is the field name for the file in the form
