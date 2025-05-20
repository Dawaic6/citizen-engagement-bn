import { Router } from 'express';
import { AgencyController } from '../controllers/agency.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { requireAdmin } from '../middleware/role.middleware';

const router = Router();

router.get('/', AgencyController.list);

// Admin-only
router.post('/', requireAuth, requireAdmin, AgencyController.create);
router.put('/:id', requireAuth, requireAdmin, AgencyController.update);

export default router;
