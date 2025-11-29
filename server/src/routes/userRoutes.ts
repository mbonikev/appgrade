import { Router } from 'express';
import { getCreators, getAllUsers, updateUser, getUserById } from '../controllers/userController';

const router = Router();

router.put('/:id', updateUser);
router.get('/all', getAllUsers);
router.get('/creators', getCreators)
router.get('/:id', getUserById);

export default router;
