"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET;
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            // Get user from the token
            // We don't need the full user object on every request, just the ID
            req.user = { id: decoded.id };
            // Check if user still exists (optional but good practice)
            const userExists = await User_1.default.findById(decoded.id).select('_id');
            if (!userExists) {
                return res.status(401).json({ message: 'Não autorizado, usuário não encontrado.' });
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Não autorizado, o token falhou.' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
    }
};
exports.protect = protect;
