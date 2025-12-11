import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET is not defined in .env file.');
}

const generateToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '24h', // Token expires in 24 hours
    });
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Por favor, forneça um nome de usuário e senha.' });
            return;
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            res.status(409).json({ message: 'Este nome de usuário já está em uso.' });
            return;
        }

        const user = await User.create({
            username,
            password,
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            message: 'Usuário registrado com sucesso!',
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao registrar usuário.', error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Por favor, forneça um nome de usuário e senha.' });
            return;
        }

        // Find user and explicitly select the password field
        const user = await User.findOne({ username }).select('+password');

        if (user && (await user.comparePassword(password))) {
            const token = generateToken(user._id);
            res.status(200).json({
                _id: user._id,
                username: user.username,
                token,
            });
        } else {
            res.status(401).json({ message: 'Nome de usuário ou senha inválidos.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor ao tentar fazer login.', error });
    }
};
