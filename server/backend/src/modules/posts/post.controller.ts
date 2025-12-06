import { Request, Response } from 'express';
import Post from './post.model';
import User from '../users/user.model';

// Extend Request to include user (populated by auth middleware)
interface AuthRequest extends Request {
    user?: any;
}

export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // @ts-ignore - multer-s3 adds location/key
        const mediaUrl = req.file.location || req.file.path;

        // Extract hashtags from caption
        const { caption, locationName } = req.body;
        const hashtags = caption ? (caption.match(/#[a-z0-9_]+/gi) || []) : [];

        const post = await Post.create({
            user: req.user.userId,
            caption,
            mediaUrl,
            mediaType: req.file.mimetype.startsWith('video') ? 'video' : 'image',
            location: locationName ? { name: locationName } : undefined,
            hashtags
        });

        res.status(201).json(post);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getFeed = async (req: AuthRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        // TODO: Filter by followed users. For now, just global feed.
        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name avatar');

        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name avatar');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getExplore = async (req: Request, res: Response) => {
    try {
        // Trending posts (simple logic: recent posts)
        const posts = await Post.find()
            .sort({ likesCount: -1, createdAt: -1 })
            .limit(20)
            .populate('user', 'name avatar');
        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
