import express from 'express';
import { createMealItem, deleteMealItem, getMealItems, getMealItemsByHostel, updateMealItem } from '../controllers/mealItems.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/',getMealItems);
router.get('/h/:id',getMealItemsByHostel);
router.post('/',auth,createMealItem);
router.patch('/:id',auth,updateMealItem);
router.delete('/:id',auth,deleteMealItem);

export default router;