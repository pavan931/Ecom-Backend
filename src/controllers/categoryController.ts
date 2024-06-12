// src/controllers/categoryController.ts
import { Request, Response } from 'express';
import { getItemsByCategory } from '../repository/categoryRepository';

export const getCategoryItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const category = req.params.categoryTitle;

    const items = await getItemsByCategory(category);

    const formattedItems = items.map(item => ({
      id: item.id,
      image: `/${item.image}`, // Update image path
      title: item.title,
      price: `$${Number(item.price).toFixed(2)}` // need to parse price 
    }));

    res.status(200).json(formattedItems);
  } catch (error) {
    console.error('Error fetching category items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

