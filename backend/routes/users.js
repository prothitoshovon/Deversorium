import express from 'express';

import {signin, signup, getuserbyemail} from '../controllers/users.js';

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/:email',getuserbyemail)
export default router;
