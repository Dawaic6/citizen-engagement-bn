import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';
import { getAdminStats } from '../controllers/admin.controller';
import { isAdmin } from '../middleware/role.middleware';

const router = Router();

router.use( requireAuth, requireAdmin as any);

router.get('/complaints', AdminController.list);
router.get('/complaints/:id', AdminController.detail);
router.put('/complaints/:id/status', AdminController.updateStatus);
router.get('/stats', isAdmin, getAdminStats);


export default router;
