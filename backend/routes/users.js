import express from 'express';

import {signin, signup, getuserbyemail, getuserbyuserid} from '../controllers/users.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/email/:email',getuserbyemail)
router.get('/:id',getuserbyuserid);
export default router;
