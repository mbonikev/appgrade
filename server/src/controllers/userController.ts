import { Request, Response } from 'express';
import User from '../models/User';

export const getCreators = async (req: Request, res: Response) => {
    try {
        // Fetch all users for now (in real app, filter by role 'creator' or similar)
        const users = await User.find().sort({ createdAt: -1 });

        // Map to Creator interface expected by frontend
        const creators = users.map(user => ({
            id: user._id.toString(),
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

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by id:', error);
        res.status(500).json({ message: 'Server error fetching user' });
    }
};


export const followUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { followerId } = req.body;

    if (userId === followerId) {
        return res.status(400).json({ message: "You cannot follow yourself" });
    }

    try {
        const User = require('../models/User').default;
        const userToFollow = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!userToFollow || !follower) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!userToFollow.followersArray.includes(followerId)) {
            await userToFollow.updateOne({ $push: { followersArray: followerId } });
            await follower.updateOne({ $push: { followingArray: userId } });

            // Update counts
            await userToFollow.updateOne({ $inc: { followers: 1 } });
            await follower.updateOne({ $inc: { following: 1 } });

            res.status(200).json({ message: "User followed" });
        } else {
            res.status(400).json({ message: "You already follow this user" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const unfollowUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { followerId } = req.body;

    if (userId === followerId) {
        return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    try {
        const User = require('../models/User').default;
        const userToUnfollow = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!userToUnfollow || !follower) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userToUnfollow.followersArray.includes(followerId)) {
            await userToUnfollow.updateOne({ $pull: { followersArray: followerId } });
            await follower.updateOne({ $pull: { followingArray: userId } });

            // Update counts
            await userToUnfollow.updateOne({ $inc: { followers: -1 } });
            await follower.updateOne({ $inc: { following: -1 } });

            res.status(200).json({ message: "User unfollowed" });
        } else {
            res.status(400).json({ message: "You dont follow this user" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getFollowers = async (req: Request, res: Response) => {
    try {
        const User = require('../models/User').default;
        const user = await User.findById(req.params.userId).populate('followersArray', 'name username avatar');
        res.status(200).json(user.followersArray);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getFollowing = async (req: Request, res: Response) => {
    try {
        const User = require('../models/User').default;
        const user = await User.findById(req.params.userId).populate('followingArray', 'name username avatar');
        res.status(200).json(user.followingArray);
    } catch (error) {
        res.status(500).json(error);
    }
};
