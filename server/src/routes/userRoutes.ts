import { Router } from 'express';
import { getCreators, getAllUsers } from '../controllers/userController';

const router = Router();

router.get('/creators', getCreators);
router.get('/all', getAllUsers);

export default router;
