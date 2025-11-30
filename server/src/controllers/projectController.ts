import { Request, Response } from 'express';
import Project from '../models/Project';
import Review from '../models/Review';
import { uploadBufferToCloudinary, uploadMultipleBuffersToCloudinary } from '../utils/uploadToCloudinary';

// Get all projects (for Discover tab)
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const { limit = 50, skip = 0 } = req.query;
        const projects = await Project.find()
            .populate('author', 'name username email avatar')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name username email avatar'
                }
            })
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
        const project = await Project.findById(projectId)
            .populate('author', 'name username email avatar')
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name username email avatar'
                }
            });
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

export const updateProject = async (req: Request, res: Response) => {
    const { projectId } = req.params;
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
            codeSnippet
        } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Handle file uploads if provided
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        // Upload logo if provided
        if (files?.logo && files.logo[0]) {
            const logoResult = await uploadBufferToCloudinary(
                files.logo[0].buffer,
                'appgrade/logos',
                `logo-${Date.now()}`
            );
            project.logo = logoResult.url;
        }

        // Upload cover image if provided
        if (files?.coverImage && files.coverImage[0]) {
            const coverResult = await uploadBufferToCloudinary(
                files.coverImage[0].buffer,
                'appgrade/covers',
                `cover-${Date.now()}`
            );
            // Replace first image or add if none
            if (project.images && project.images.length > 0) {
                project.images[0] = coverResult.url;
            } else {
                project.images = [coverResult.url];
            }
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
            const galleryUrls = galleryResults.map(result => result.url);
            // Append to existing images (keeping cover as first)
            const coverImage = project.images && project.images.length > 0 ? [project.images[0]] : [];
            project.images = [...coverImage, ...galleryUrls];
        }

        // Update text fields
        if (title) project.title = title;
        if (tagline) project.tagline = tagline;
        if (description) project.description = description;
        if (website !== undefined) project.website = website;
        if (categories) project.categories = JSON.parse(categories);
        if (tags) project.tags = JSON.parse(tags);
        if (type) project.type = type;
        if (submissionType) project.submissionType = submissionType;
        if (link !== undefined) project.link = link;
        if (codeSnippet !== undefined) project.codeSnippet = codeSnippet;

        await project.save();

        res.status(200).json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Server error updating project' });
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

export const addReview = async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const { userId, rating, comment } = req.body;

    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const review = await Review.create({
            project: projectId,
            user: userId,
            rating,
            comment
        });

        // Populate the user data
        await review.populate('user', 'name username email avatar');

        // Update project stats
        const reviews = await Review.find({ project: projectId });
        const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

        project.reviews.push(review._id as any);
        project.averageRating = avgRating;
        project.reviewsCount = reviews.length;
        await project.save();

        res.status(201).json(review);
    } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this project' });
        }
        console.error('Error adding review:', error);
        res.status(500).json({ message: 'Server error adding review' });
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    const { projectId, reviewId } = req.params;
    const { userId } = req.body;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if user is the author of the review
        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await Review.findByIdAndDelete(reviewId);

        // Update project stats
        const project = await Project.findById(projectId);
        if (project) {
            const reviews = await Review.find({ project: projectId });
            const avgRating = reviews.length > 0
                ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
                : 0;

            project.reviews = project.reviews.filter((r: any) => r.toString() !== reviewId);
            project.averageRating = avgRating;
            project.reviewsCount = reviews.length;
            await project.save();
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error deleting review' });
    }
};

