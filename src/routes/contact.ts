import { Router } from 'express';
import {
  submitMessage,
  getMessages,
  markAsRead,
  deleteMessage,
} from '../controllers/contactController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/', submitMessage);
router.get('/', authMiddleware, getMessages);
router.put('/:id/read', authMiddleware, markAsRead);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;
