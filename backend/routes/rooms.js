import express from 'express';
import { getRooms, createRoom, updateRoom, deleteRoom, getEmptyRooms, bookRoom, getRoomsByRoomId } from '../controllers/rooms.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getRooms);
router.get('/:id',getRoomsByRoomId)
router.get('/available',getEmptyRooms);
router.patch('/book/r/:id/u/:uid',auth,bookRoom);
router.post('/', auth, createRoom);
router.patch('/:id', auth, updateRoom);
router.delete('/:id', auth, deleteRoom);
export default router;