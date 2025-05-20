import { Router } from 'express';
import { ComplaintController } from '../controllers/complaint.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/', requireAuth, ComplaintController.submit as any);
router.get('/my', requireAuth, ComplaintController.myComplaints as any);
router.get('/:id', requireAuth, ComplaintController.detail as any);


export default router;
 