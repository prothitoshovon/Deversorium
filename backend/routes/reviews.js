import express from 'express';

import auth from '../middleware/auth.js';
import { getReviews, getReviewsByHostel, getReviewsByUser, createReview, updateReview, deleteReview, getReviewsByUserAndHostel } from '../controllers/reviews.js';
const router = express.Router();

router.get('/',getReviews);
router.get('/h/:id',getReviewsByHostel);
router.get('/u/:id',getReviewsByUser);
router.get('/userhostel/:uid/:hid',getReviewsByUserAndHostel);
router.post('/', auth, createReview);
router.patch('/:id',auth,updateReview);
router.delete('/:id',auth,deleteReview);

export default router;