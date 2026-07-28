import { Router } from 'express';
import {
  getTestimonials,
  getFeaturedTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController';
import { authMiddleware } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.get('/', getTestimonials);
router.get('/featured', getFeaturedTestimonials);
router.post('/', authMiddleware, uploadSingle('photo'), createTestimonial);
router.put('/:id', authMiddleware, uploadSingle('photo'), updateTestimonial);
router.delete('/:id', authMiddleware, deleteTestimonial);

export default router;
