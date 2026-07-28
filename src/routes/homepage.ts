import { Router } from 'express';
import { getHomepageContent, updateHomepageContent } from '../controllers/homepageController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getHomepageContent);
router.put('/', authMiddleware, updateHomepageContent);

export default router;
