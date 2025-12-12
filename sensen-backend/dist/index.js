"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Moved to the very top
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path")); // Import path module
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes")); // Import game routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes")); // Import auth routes
const settingsRoutes_1 = __importDefault(require("./routes/settingsRoutes")); // Import settings routes
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes")); // Import upload routes
const multer_1 = require("multer"); // Import MulterError
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sensen-games'; // Default fallback
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected successfully!');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};
connectDB(); // Connect to DB before starting server
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Serve static files from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Use auth routes
app.use('/api/auth', authRoutes_1.default);
// Use game routes
app.use('/api/games', gameRoutes_1.default);
// Use settings routes
app.use('/api/settings', settingsRoutes_1.default);
// Use upload routes
app.use('/api/upload', uploadRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Sensen Backend is running!');
});
// Multer error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer_1.MulterError) {
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
