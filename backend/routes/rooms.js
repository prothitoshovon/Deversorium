import express from 'express';
import { getRooms, createRoom, updateRoom, deleteRoom, getEmptyRooms, bookRoom, getRoomsByRoomId, leaveRoom, getRoomByTenantId } from '../controllers/rooms.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.get('/', getRooms);
router.get('/available',getEmptyRooms);
router.get('/t/:id',getRoomByTenantId);
router.get('/:id',getRoomsByRoomId)

router.patch('/book/r/:id/u/:uid/h/:hid',auth,bookRoom);
router.patch('/leave/r/:id/u/:uid/h/:hid',auth,leaveRoom);
router.post('/', auth, createRoom);
router.patch('/:id', auth, updateRoom);
router.delete('/:id', auth, deleteRoom);
export default router;