import { Router } from 'express';
import { login, verify, register, logout } from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/verify', authMiddleware, verify);
router.post('/logout', authMiddleware, logout);

export default router;
