import { Router } from 'express';
import { getCreators, getAllUsers, updateUser } from '../controllers/userController';

const router = Router();

router.put('/:id', updateUser);
router.get('/all', getAllUsers);
router.get('/creators', getCreators)

export default router;
