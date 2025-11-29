import { Router } from 'express';
import { getProjectsByUserId, createProject, getProjectById, getAllProjects } from '../controllers/projectController';
import { uploadFields } from '../config/multerConfig';

const router = Router();

// Get all projects (Discover tab) - must be before /:projectId
router.get('/', getAllProjects);

// Get projects by user ID
router.get('/user/:userId', getProjectsByUserId);

// Get single project by ID
router.get('/:projectId', getProjectById);

// Create new project with file uploads
router.post('/', uploadFields, createProject);

export default router;


