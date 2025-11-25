import { Router } from 'express';
import passport from 'passport';
import { handleOAuthCallback, getCurrentUser, logout } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Google OAuth routes
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.CLIENT_URL}/auth/error`,
        session: false,
    }),
    handleOAuthCallback
);

// GitHub OAuth routes
router.get(
    '/github',
    passport.authenticate('github', {
        scope: ['user:email'],
    })
);

router.get(
    '/github/callback',
    passport.authenticate('github', {
        failureRedirect: `${process.env.CLIENT_URL}/auth/error`,
        session: false,
    }),
    handleOAuthCallback
);

// Get current user (protected route)
router.get('/user', authenticateToken as any, getCurrentUser);

// Logout
router.post('/logout', logout);

export default router;
