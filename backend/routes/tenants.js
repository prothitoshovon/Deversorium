import express from 'express';
import { getTenants, createTenant, updateTenant, deleteTenant } from '../controllers/tenants.js';
const router = express.Router();

router.get('/', getTenants);
router.post('/',createTenant);
router.patch('/:id',updateTenant);
router.delete('/:id',deleteTenant);
export default router;