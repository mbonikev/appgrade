import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    avatar?: string;
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
        avatar: {
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
