import { Request, Response } from 'express';
import { ComplaintService } from '../services/complaint.service';
import { AppDataSource } from '../config/data-source';
import { Complaint } from '../entities/Complaint';

interface AuthenticatedRequest extends Request {
  user: { id: number };
} 


export const ComplaintController = {
  async submit(req: AuthenticatedRequest, res: Response) {
    try {
      const { subject, description, categoryId,agencyId} = req.body;
      const userId = req.user.id;

      const complaint = await ComplaintService.submitComplaint(
        userId, subject, description, categoryId,agencyId
      );

      res.status(201).json(complaint);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async myComplaints(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const complaints = await ComplaintService.getUserComplaints(userId);
      res.json(complaints);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async detail(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    const complaint = await AppDataSource.getRepository(Complaint).findOne({
      where: { id, user: { id: userId } },
      relations: ['category', 'agency', 'statusHistory', 'statusHistory.updatedBy']
    });

    if (!complaint) return res.status(404).json({ error: 'Complaint not found or unauthorized' });

    res.json(complaint);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

};
 