import express from 'express';
import { getHostels } from '../controllers/hostels.js';
const router = express.Router();

router.get('/', getHostels);

export default router;