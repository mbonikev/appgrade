import { Router } from 'express';
import {
    createNomination,
    getUserNominations,
    deleteNomination,
    getNominationsByCategory
} from '../controllers/nominationController';

const router = Router();

router.post('/', createNomination);
router.get('/user/:userId', getUserNominations);
router.delete('/:nominationId', deleteNomination);
router.get('/category/:categoryId', getNominationsByCategory);

export default router;
