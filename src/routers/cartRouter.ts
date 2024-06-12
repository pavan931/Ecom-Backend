import { Router } from 'express';
import { addCartItem, removeCartItem, clearCartItems, getAllItemsToCart } from '../controllers/cartController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

// Add item
router.post('/:userId/cart/add',authenticateJWT,addCartItem)


// Remove Item
router.delete('/remove/:userId/:itemId', removeCartItem); // Use DELETE method for removing items

// Clear Cart Items
router.post('/clear/:userId', clearCartItems);

// Get All Cart Items
router.get('/:userId', getAllItemsToCart);

export default router;
