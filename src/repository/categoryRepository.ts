import db from '../db';

interface Item {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const getItemsByCategory = async (category: string): Promise<Item[]> => {
  return await db('items')
    .select('id', 'title', 'price', 'image')
    .where('category', category);
};
