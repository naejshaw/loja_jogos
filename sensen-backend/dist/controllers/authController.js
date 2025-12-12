"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET is not defined in .env file.');
}
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, {
        expiresIn: '24h', // Token expires in 24 hours
    });
};
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Por favor, forneça um nome de usuário e senha.' });
            return;
        }
        const userExists = await User_1.default.findOne({ username });
        if (userExists) {
            res.status(409).json({ message: 'Este nome de usuário já está em uso.' });
            return;
        }
        const user = await User_1.default.create({
            username,
            password,
        });
        res.status(201).json({
            _id: user._id,
            username: user.username,
            message: 'Usuário registrado com sucesso!',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao registrar usuário.', error });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Por favor, forneça um nome de usuário e senha.' });
            return;
        }
        // Find user and explicitly select the password field
        const user = await User_1.default.findOne({ username }).select('+password');
        if (user && (await user.comparePassword(password))) {
            const token = generateToken(String(user._id));
            res.status(200).json({
                _id: user._id,
                username: user.username,
                token,
            });
        }
        else {
            res.status(401).json({ message: 'Nome de usuário ou senha inválidos.' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao tentar fazer login.', error });
    }
};
exports.login = login;
