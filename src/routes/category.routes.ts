import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';

const router = Router();

router.get('/', CategoryController.list);

// Admin routes
router.post('/', requireAuth, requireAdmin, CategoryController.create );
router.put('/:id', requireAuth, requireAdmin, CategoryController.update);

export default router;
