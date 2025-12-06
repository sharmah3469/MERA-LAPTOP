import express from 'express';
import { createPost, getFeed, getPostById, getExplore } from './post.controller';
import { protect } from '../../middleware/auth.middleware';
import { upload } from '../../utils/s3';

const router = express.Router();

router.get('/feed', protect, getFeed);
router.get('/explore', getExplore);
router.get('/:id', getPostById);
router.post('/', protect, upload.single('media'), createPost);

export default router;
