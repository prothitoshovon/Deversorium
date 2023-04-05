import express from 'express';
import { getHostels, createHostel, updateHostel, deleteHostel } from '../controllers/hostels.js';
const router = express.Router();

router.get('/', getHostels);
router.post('/',createHostel);
router.patch('/:id',updateHostel);
router.delete('/:id',deleteHostel);
export default router;