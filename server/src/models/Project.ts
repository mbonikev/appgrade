import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
    title: string;
    tagline: string;
    description: string;
    website?: string;
    categories: string[];
    tags: string[];
    type: 'project' | 'screens' | 'ui_element' | 'theme';
    submissionType: 'design' | 'developed';
    images: string[];
    logo?: string; // Logo URL
    link?: string; // For developed projects
    codeSnippet?: string; // For themes and UI elements
    author: mongoose.Types.ObjectId;
    reviews: mongoose.Types.ObjectId[];
    averageRating: number;
    reviewsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        tagline: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            trim: true,
        },
        categories: [{
            type: String,
            trim: true,
        }],
        tags: [{
            type: String,
            trim: true,
        }],
        type: {
            type: String,
            enum: ['project', 'screens', 'ui_element', 'theme'],
            default: 'project',
        },
        submissionType: {
            type: String,
            enum: ['design', 'developed'],
            required: true,
        },
        images: [{
            type: String,
        }],
        logo: {
            type: String,
            trim: true,
        },
        link: {
            type: String,
            trim: true,
        },
        codeSnippet: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }],
        averageRating: {
            type: Number,
            default: 0,
        },
        reviewsCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
