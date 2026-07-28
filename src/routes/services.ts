import { Router } from 'express';
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController';
import { authMiddleware } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);
router.post('/', authMiddleware, uploadSingle('image'), createService);
router.put('/:id', authMiddleware, uploadSingle('image'), updateService);
router.delete('/:id', authMiddleware, deleteService);

export default router;
