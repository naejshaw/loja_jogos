import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      // Get user from the token
      // We don't need the full user object on every request, just the ID
      req.user = { id: decoded.id };

      // Check if user still exists (optional but good practice)
      const userExists = await User.findById(decoded.id).select('_id');
      if (!userExists) {
        return res.status(401).json({ message: 'Não autorizado, usuário não encontrado.' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Não autorizado, o token falhou.' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};
