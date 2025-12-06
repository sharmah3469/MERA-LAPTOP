import express from 'express';
import { getUserProfile, updateProfile, followUser } from './user.controller';
import { protect } from '../../middleware/auth.middleware';

const router = express.Router();

router.get('/:id', getUserProfile);
router.put('/me', protect, updateProfile);
router.post('/:id/follow', protect, followUser);

export default router;
