import { Request, Response } from 'express';
import Nomination from '../models/Nomination';
import Project from '../models/Project';

// Create or update nomination (upsert)
export const createNomination = async (req: Request, res: Response) => {
    const { userId, projectId, category } = req.body;

    try {
        // Verify the project exists and belongs to the user
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.author.toString() !== userId) {
            return res.status(403).json({ message: 'You can only nominate your own projects' });
        }

        // Upsert: Update if exists, create if not
        const nomination = await Nomination.findOneAndUpdate(
            { user: userId, category },
            { user: userId, project: projectId, category },
            { new: true, upsert: true }
        ).populate('project', 'title tagline logo images');

        res.status(200).json(nomination);
    } catch (error: any) {
        console.error('Error creating nomination:', error);
        res.status(500).json({ message: 'Server error creating nomination' });
    }
};

// Get all nominations for a user
export const getUserNominations = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const nominations = await Nomination.find({ user: userId })
            .populate('project', 'title tagline logo images averageRating reviewsCount')
            .sort({ createdAt: -1 });

        res.status(200).json(nominations);
    } catch (error) {
        console.error('Error fetching user nominations:', error);
        res.status(500).json({ message: 'Server error fetching nominations' });
    }
};

// Delete a nomination
export const deleteNomination = async (req: Request, res: Response) => {
    const { nominationId } = req.params;
    const { userId } = req.body;

    try {
        const nomination = await Nomination.findById(nominationId);

        if (!nomination) {
            return res.status(404).json({ message: 'Nomination not found' });
        }

        // Verify ownership
        if (nomination.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own nominations' });
        }

        await Nomination.findByIdAndDelete(nominationId);
        res.status(200).json({ message: 'Nomination deleted successfully' });
    } catch (error) {
        console.error('Error deleting nomination:', error);
        res.status(500).json({ message: 'Server error deleting nomination' });
    }
};

// Get all nominations for a specific category (public view)
export const getNominationsByCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    try {
        const nominations = await Nomination.find({ category: categoryId })
            .populate('user', 'name username avatar')
            .populate('project', 'title tagline logo images averageRating reviewsCount')
            .sort({ createdAt: -1 });

        res.status(200).json(nominations);
    } catch (error) {
        console.error('Error fetching category nominations:', error);
        res.status(500).json({ message: 'Server error fetching nominations' });
    }
};
