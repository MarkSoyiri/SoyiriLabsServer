import { Router } from 'express';
import authRoutes from './auth';
import projectRoutes from './projects';
import serviceRoutes from './services';
import testimonialRoutes from './testimonials';
import blogRoutes from './blog';
import contactRoutes from './contact';
import homepageRoutes from './homepage';
import companyRoutes from './company';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/blog', blogRoutes);
router.use('/contact', contactRoutes);
router.use('/homepage', homepageRoutes);
router.use('/company', companyRoutes);

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Soyiri Labs API is running', timestamp: new Date().toISOString() });
});

export default router;
