import { Request, Response } from 'express';
import User from '../models/User';

export const getCreators = async (req: Request, res: Response) => {
    try {
        // Fetch all users for now (in real app, filter by role 'creator' or similar)
        const users = await User.find().sort({ createdAt: -1 });

        // Map to Creator interface expected by frontend
        const creators = users.map(user => ({
            id: user._id,
            name: user.name,
            username: user.username || `@${user.email.split('@')[0]}`, // Fallback
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`,
            bio: user.bio || 'No bio yet.',
            followers: user.followers || 0,
            appsCount: user.appsCount || 0,
            isVerified: user.isVerified || false,
            coverImage: user.coverImage || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000' // Default cover
        }));

        res.status(200).json(creators);
    } catch (error) {
        console.error('Error fetching creators:', error);
        res.status(500).json({ message: 'Server error fetching creators' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Server error fetching all users' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { bio } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { bio }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error updating user' });
    }
};
