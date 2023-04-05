import express from 'express';
import { getTenants, createTenant } from '../controllers/tenants.js';
const router = express.Router();

router.get('/', getTenants);
router.post('/',createTenant);
export default router;