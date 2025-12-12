"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUploadMiddleware = exports.imageUploadMiddleware = exports.uploadVideo = exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the uploads directory exists relative to the server's root
        cb(null, path_1.default.join(__dirname, '../../public/uploads'));
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using timestamp and original extension
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Filter for image files
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'), false);
    }
};
// Filter for video files
const videoFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only video files are allowed!'), false);
    }
};
// Initialize multer upload middleware for images
const uploadImageMiddleware = (0, multer_1.default)({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB file size limit
    },
});
// Initialize multer upload middleware for videos
const uploadVideoMiddleware = (0, multer_1.default)({
    storage: storage,
    fileFilter: videoFileFilter,
    limits: {
        fileSize: 1024 * 1024 * 200, // 200 MB file size limit for videos
    },
});
// @route   POST /api/upload/image
// @desc    Upload an image file
// @access  Private (admin only)
const uploadImage = (req, res) => {
    if (req.file) {
        // Return the URL of the uploaded file
        // Assumes server is serving static files from /public
        const fileUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ url: fileUrl });
    }
    else {
        res.status(400).json({ message: 'No file uploaded.' });
    }
};
exports.uploadImage = uploadImage;
// @route   POST /api/upload/video
// @desc    Upload a video file
// @access  Private (admin only)
const uploadVideo = (req, res) => {
    if (req.file) {
        const fileUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ url: fileUrl });
    }
    else {
        res.status(400).json({ message: 'No file uploaded.' });
    }
};
exports.uploadVideo = uploadVideo;
// Export the multer middleware for use in routes
exports.imageUploadMiddleware = uploadImageMiddleware.single('image'); // 'image' is the field name for the file in the form
exports.videoUploadMiddleware = uploadVideoMiddleware.single('video'); // 'video' is the field name for the file in the form
