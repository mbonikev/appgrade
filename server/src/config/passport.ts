import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User, { IUser } from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Serialize user for the session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: 'http://localhost:5000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({
                    provider: 'google',
                    providerId: profile.id,
                });

                if (!user) {
                    // Create new user
                    user = await User.create({
                        email: profile.emails?.[0]?.value || '',
                        name: profile.displayName,
                        avatar: profile.photos?.[0]?.value,
                        provider: 'google',
                        providerId: profile.id,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

// GitHub OAuth Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            callbackURL: 'http://localhost:5000/auth/github/callback',
        },
        async (accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                // Check if user already exists
                let user = await User.findOne({
                    provider: 'github',
                    providerId: profile.id,
                });

                if (!user) {
                    // Create new user
                    user = await User.create({
                        email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
                        name: profile.displayName || profile.username,
                        avatar: profile.photos?.[0]?.value,
                        provider: 'github',
                        providerId: profile.id,
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error as Error, undefined);
            }
        }
    )
);

export default passport;
