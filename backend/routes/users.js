import express from 'express';

import {signin, signup, getuserbyemail, getuserbyuserid, updateuser} from '../controllers/users.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.get('/email/:email',getuserbyemail)
router.patch('/update/:uid',updateuser)
router.get('/:id',getuserbyuserid);
export default router;
