import { Router } from 'express';
import { getCompanyInfo, updateCompanyInfo } from '../controllers/companyController';
import { authMiddleware } from '../middleware/auth';
import { uploadMultiple } from '../middleware/upload';

const router = Router();

router.get('/', getCompanyInfo);
router.put('/', authMiddleware, uploadMultiple('logo,favicon'), updateCompanyInfo);

export default router;
