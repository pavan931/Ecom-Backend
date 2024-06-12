import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ success: false, message: 'Access token is missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    console.log(decoded);
    
    // req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ success: false, message: 'Token is not valid' });
  }
};
