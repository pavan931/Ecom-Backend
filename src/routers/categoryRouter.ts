import { Router } from 'express';
import { getCategoryItems } from '../controllers/categoryController';

const router = Router();

router.get('/category/:categoryTitle', getCategoryItems);

export default router;
