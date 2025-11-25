import { Router } from 'express';
import { getCreators } from '../controllers/userController';

const router = Router();

router.get('/creators', getCreators);

export default router;
