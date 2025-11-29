import { Router } from 'express';
import {
    getProjectsByUserId,
    createProject,
    getProjectById,
    getAllProjects,
    deleteProject,
    updateProject,
    saveProject,
    unsaveProject,
    getSavedProjects,
    getFollowedProjects,
    addReview
} from '../controllers/projectController';
import { uploadFields } from '../config/multerConfig';

const router = Router();

// Get all projects (Discover tab) - must be before /:projectId
router.get('/', getAllProjects);

// Get projects by user ID
router.get('/user/:userId', getProjectsByUserId);

// Get followed projects
router.get('/followed/:userId', getFollowedProjects);

// Get saved projects
router.get('/saved/:userId', getSavedProjects);

// Create new project with file uploads
router.post('/', uploadFields, createProject);

// Save/Unsave project
router.post('/:projectId/save', saveProject);
router.delete('/:projectId/save', unsaveProject);

// Update project
router.put('/:projectId', uploadFields, updateProject);

// Delete project
router.delete('/:projectId', deleteProject);

// Get single project by ID (keep last to avoid conflicts)
router.get('/:projectId', getProjectById);

// Add review
router.post('/:projectId/reviews', addReview);

export default router;


