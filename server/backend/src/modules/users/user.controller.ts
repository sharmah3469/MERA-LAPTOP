import { Request, Response } from 'express';
import User from './user.model';

interface AuthRequest extends Request {
    user?: any;
}

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // TODO: Add posts summary aggregation here
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.bio = req.body.bio || user.bio;
        user.location = req.body.location || user.location;
        user.language = req.body.language || user.language;

        if (req.body.avatar) {
            user.avatar = req.body.avatar;
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const followUser = async (req: AuthRequest, res: Response) => {
    try {
        const targetUserId = req.params.id;
        const currentUserId = req.user.userId;

        if (targetUserId === currentUserId) {
            return res.status(400).json({ message: 'Cannot follow yourself' });
        }

        // Logic for follow (requires a Follow model or array on User)
        // For MVP, we will assume a generic "Follow" printed to console or simplistic implementation
        // Ideally create a Follow model. I will create a simple Follow model next.

        res.json({ message: `Followed user ${targetUserId}` });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
