import { Request, Response } from 'express';
import db from '../db';
import { contactUser } from '../repository/contactRepository';

interface ContactRequestBody {
  fname: string;
  lname: string;
  email: string;
  mobileNo: string;
  message: string;
}

export const submitContactForm = async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
  const { fname, lname, email, mobileNo, message } = req.body;

  if (!fname || !lname || !email || !mobileNo || !message) {
    return res.status(400).send({ success: false, message: 'All fields are required' });
  }

  try {
    await contactUser({ fname, lname, email, mobileNo, message });
    res.status(200).send({ success: true, message: 'Query Received' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send({ success: false, message: 'Failed to register user' });
  }
};
