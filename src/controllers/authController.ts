import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import  Jwt  from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../repository/userRepository';

import dotenv from 'dotenv'
dotenv.config()
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  mobileNo: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

const secretVal = process.env.JWT_SECRET || ''

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
  const { name, email, password, mobileNo } = req.body;

  if (!name || !email || !password || !mobileNo) {
    return res.status(400).send({ success: false, message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      name, email, password: hashedPassword, mobileNo,
      
    });
    res.status(200).send({ success: true, message: 'User Registered Successfully' });
  } catch (err) {
    console.error('Error Registering user: ', err);
    res.status(500).send({ success: false, message: 'Failed to register User' });
  }
};

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ success: false, message: 'Invalid password' });
    }

    const token = Jwt.sign({ userId: user.id }, secretVal, { expiresIn: '1h' });


    res.status(200).send({ token, user });
  } catch (err) {
    console.error('Error querying user:', err);
    res.status(500).send({ success: false, message: 'Failed to query user' });
  }
};
