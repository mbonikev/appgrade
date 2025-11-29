import { Request, Response } from 'express';
import Project from '../models/Project';
import { uploadBufferToCloudinary, uploadMultipleBuffersToCloudinary } from '../utils/uploadToCloudinary';

// Get all projects (for Discover tab)
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const { limit = 50, skip = 0 } = req.query;
        const projects = await Project.find()
            .populate('author', 'name username email avatar')
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));

        const total = await Project.countDocuments();

        res.status(200).json({
            projects,
            total,
            hasMore: Number(skip) + projects.length < total
        });
    } catch (error) {
        console.error('Error fetching all projects:', error);
        res.status(500).json({ message: 'Server error fetching projects' });
    }
};

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

export const getProjectById = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId).populate('author', 'name username email avatar');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error('Error fetching project by id:', error);
        res.status(500).json({ message: 'Server error fetching project' });
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const {
            title,
            tagline,
            description,
            website,
            categories,
            tags,
            type,
            submissionType,
            link,
            codeSnippet,
            author
        } = req.body;

        // Validate required fields
        if (!title || !tagline || !description || !submissionType || !author) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Handle file uploads
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const imageUrls: string[] = [];

        // Upload logo if provided
        let logoUrl = '';
        if (files?.logo && files.logo[0]) {
            const logoResult = await uploadBufferToCloudinary(
                files.logo[0].buffer,
                'appgrade/logos',
                `logo-${Date.now()}`
            );
            logoUrl = logoResult.url;
        }

        // Upload cover image if provided
        if (files?.coverImage && files.coverImage[0]) {
            const coverResult = await uploadBufferToCloudinary(
                files.coverImage[0].buffer,
                'appgrade/covers',
                `cover-${Date.now()}`
            );
            imageUrls.push(coverResult.url);
        }

        // Upload gallery images if provided
        if (files?.gallery && files.gallery.length > 0) {
            const galleryFiles = files.gallery.map((file, index) => ({
                buffer: file.buffer,
                filename: `gallery-${Date.now()}-${index}`
            }));
            const galleryResults = await uploadMultipleBuffersToCloudinary(
                galleryFiles,
                'appgrade/gallery'
            );
            imageUrls.push(...galleryResults.map(r => r.url));
        }

        // Create project
        const project = new Project({
            title,
            tagline,
            description,
            website: website || undefined,
            categories: categories ? JSON.parse(categories) : [],
            tags: tags ? JSON.parse(tags) : [],
            type: type || 'project',
            submissionType,
            images: imageUrls,
            link: link || undefined,
            logo: logoUrl || undefined,
            codeSnippet: codeSnippet || undefined,
            author
        });

        await project.save();

        // Update user's appsCount
        const User = require('../models/User').default;
        await User.findByIdAndUpdate(author, { $inc: { appsCount: 1 } });

        res.status(201).json({
            message: 'Project created successfully',
            project
        });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Server error creating project' });
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await Project.findByIdAndDelete(projectId);

        // Update user's appsCount
        const User = require('../models/User').default;
        await User.findByIdAndUpdate(project.author, { $inc: { appsCount: -1 } });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Server error deleting project' });
    }
};

export const saveProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { userId } = req.body;

    try {
        const User = require('../models/User').default;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.savedProjects.includes(projectId)) {
            await user.updateOne({ $push: { savedProjects: projectId } });
            res.status(200).json({ message: 'Project saved' });
        } else {
            res.status(400).json({ message: 'Project already saved' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const unsaveProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { userId } = req.body;

    try {
        const User = require('../models/User').default;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.savedProjects.includes(projectId)) {
            await user.updateOne({ $pull: { savedProjects: projectId } });
            res.status(200).json({ message: 'Project unsaved' });
        } else {
            res.status(400).json({ message: 'Project not saved' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getSavedProjects = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const User = require('../models/User').default;
        const user = await User.findById(userId).populate({
            path: 'savedProjects',
            populate: { path: 'author', select: 'name username avatar' }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.savedProjects);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getFollowedProjects = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const User = require('../models/User').default;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const projects = await Project.find({ author: { $in: user.followingArray } })
            .populate('author', 'name username avatar')
            .sort({ createdAt: -1 });

        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching followed projects:', error);
        res.status(500).json({ message: 'Server error fetching followed projects' });
    }
};

