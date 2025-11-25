import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { AuthRequest } from '../middleware/auth';

// Generate JWT token
const generateToken = (userId: string): string => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign({ userId }, jwtSecret, {
        expiresIn: '7d', // Token expires in 7 days
    });
};

// Handle OAuth callback success
export const handleOAuthCallback = (req: Request, res: Response): void => {
    try {
        // Explicitly cast req.user to IUser to avoid type errors
        const user = req.user as IUser;

        if (!user) {
            res.redirect(`${process.env.CLIENT_URL}/auth/error`);
            return;
        }

        // Generate JWT token
        const token = generateToken(user._id.toString());

        // Redirect to frontend with token
        res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    } catch (error) {
        console.error('OAuth callback error:', error);
        res.redirect(`${process.env.CLIENT_URL}/auth/error`);
    }
};

// Get current user
export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;

        if (!user) {
            res.status(401).json({ message: 'Not authenticated' });
            return;
        }

        res.json({
            id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            provider: user.provider,
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout user
export const logout = (req: Request, res: Response): void => {
    req.logout((err) => {
        if (err) {
            res.status(500).json({ message: 'Logout failed' });
            return;
        }
        res.json({ message: 'Logged out successfully' });
    });
};
