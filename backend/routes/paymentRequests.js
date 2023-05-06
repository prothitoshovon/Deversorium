import express from 'express';
import auth from '../middleware/auth.js';
import { createPaymentRequest, deletePaymentRequest, getPaymentRequests, getPaymentRequestsByHostelId, updatePaymentRequest } from '../controllers/paymentRequests.js';
const router = express.Router();

router.get('/',getPaymentRequests);
router.get('/h/:hid',getPaymentRequestsByHostelId);
router.post('/',auth,createPaymentRequest);
router.patch('/:id',auth,updatePaymentRequest);
router.delete('/:id',auth,deletePaymentRequest);

export default router;