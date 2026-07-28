import { Router } from 'express';
import {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../controllers/blogController';
import { authMiddleware } from '../middleware/auth';
import { uploadSingle } from '../middleware/upload';

const router = Router();

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);
router.post('/', authMiddleware, uploadSingle('coverImage'), createBlogPost);
router.put('/:id', authMiddleware, uploadSingle('coverImage'), updateBlogPost);
router.delete('/:id', authMiddleware, deleteBlogPost);

export default router;
