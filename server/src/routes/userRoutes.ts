import { Router } from 'express';
import {
    getCreators,
    getAllUsers,
    updateUser,
    getUserById,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
} from '../controllers/userController';

const router = Router();

router.put('/:id', updateUser);
router.get('/all', getAllUsers);
router.get('/creators', getCreators)
router.get('/:id', getUserById);

// Follow System Routes
router.post('/:userId/follow', followUser);
router.delete('/:userId/follow', unfollowUser);
router.get('/:userId/followers', getFollowers);
router.get('/:userId/following', getFollowing);

export default router;
