import mongoose, { Document, Schema } from 'mongoose';

export interface INomination extends Document {
    user: mongoose.Types.ObjectId;
    project: mongoose.Types.ObjectId;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

const NominationSchema = new Schema<INomination>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                'sotw',      // Site of the Week
                'pca',       // People's Choice Award
                'rda',       // Rising Designer Award
                'mic',       // Most Innovative Concept
                'mid',       // Most Improved Design
                'sotm'       // Site of the Month
            ],
        },
    },
    {
        timestamps: true,
    }
);

// Ensure one nomination per category per user
NominationSchema.index({ user: 1, category: 1 }, { unique: true });

export default mongoose.model<INomination>('Nomination', NominationSchema);
