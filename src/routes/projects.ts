import { Router } from 'express';
import {
  getProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';
import { authMiddleware } from '../middleware/auth';
import { uploadSingle, uploadMultiple } from '../middleware/upload';

const router = Router();

router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:slug', getProjectBySlug);
router.post('/', authMiddleware, uploadSingle('thumbnail'), createProject);
router.put('/:id', authMiddleware, uploadSingle('thumbnail'), updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;
