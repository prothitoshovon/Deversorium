import express from 'express';
import { getOwners, createOwner, updateOwner, deleteOwner } from '../controllers/owners.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getOwners);
router.post('/', auth, createOwner);
router.patch('/:id', auth, updateOwner);
router.delete('/:id', auth, deleteOwner);
export default router;