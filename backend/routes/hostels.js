import express from 'express';
import { getHostels, createHostel } from '../controllers/hostels.js';
const router = express.Router();

router.get('/', getHostels);
router.post('/',createHostel);
export default router;