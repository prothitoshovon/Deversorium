import express from 'express';
import { getTenants, createTenant, updateTenant, deleteTenant, getTenantsByUserId, getTenantsByHostelId } from '../controllers/tenants.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTenants);
router.get('/h/:id',getTenantsByHostelId);
router.get('/:id',getTenantsByUserId);
router.post('/', auth, createTenant);
router.patch('/:id', auth, updateTenant);
router.delete('/:id', auth, deleteTenant);
export default router;