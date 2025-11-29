import { Request, Response } from 'express';
import Project from '../models/Project';

export const getProjectsByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const projects = await Project.find({ author: userId }).sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects by user id:', error);
        res.status(500).json({ message: 'Server error fetching projects' });
    }
};
