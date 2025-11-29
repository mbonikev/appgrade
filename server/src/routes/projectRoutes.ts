import { Router } from 'express';
import { getProjectsByUserId } from '../controllers/projectController';

const router = Router();

router.get('/user/:userId', getProjectsByUserId);

export default router;
