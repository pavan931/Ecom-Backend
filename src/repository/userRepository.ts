import db from '../db';

interface User {
  name: string;
  email: string;
  password: string;
  mobileNo: string;
}

interface User1 extends User{
  id:number
}

export const createUser = async (user: User): Promise<void> => {
  await db('users').insert(user);
};

export const findUserByEmail = async (email: string): Promise<User1 | null> => {
  const users = await db.select('*').from('users').where('email', email);
  return users.length ? users[0] : null;
};
