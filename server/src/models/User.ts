import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    username?: string;
    avatar?: string;
    bio?: string;
    website?: string;
    role: 'user' | 'creator' | 'admin';
    followers: number;
    following: number;
    appsCount: number;
    isVerified: boolean;
    coverImage?: string;
    provider: 'google' | 'github';
    providerId: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            unique: true,
            sparse: true, // Allows null/undefined to not conflict
            trim: true,
        },
        avatar: {
            type: String,
        },
        bio: {
            type: String,
            default: '',
        },
        website: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['user', 'creator', 'admin'],
            default: 'user',
        },
        followers: {
            type: Number,
            default: 0,
        },
        following: {
            type: Number,
            default: 0,
        },
        appsCount: {
            type: Number,
            default: 0,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        coverImage: {
            type: String,
        },
        provider: {
            type: String,
            required: true,
            enum: ['google', 'github'],
        },
        providerId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create a compound index for provider and providerId
UserSchema.index({ provider: 1, providerId: 1 }, { unique: true });

export default mongoose.model<IUser>('User', UserSchema);
