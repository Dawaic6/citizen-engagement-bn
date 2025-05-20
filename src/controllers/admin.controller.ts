import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { AppDataSource } from '../config/data-source';
import { Complaint } from 'entities/Complaint';
import { AuthService } from '../services/auth.service';

export const AdminController = {
  async list(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const complaints = await AdminService.getAllComplaints(status as string);
      res.json(complaints);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status, comment } = req.body;
      const adminId = req.user.id;

      const complaint = await AdminService.updateStatus(id, status, comment, adminId);
      res.json(complaint);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async detail(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const complaint = await AdminService.getComplaintDetail(id);
      res.json(complaint);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
};
export const getAdminStats = async (req: AuthService, res: Response) => {
  const repo = AppDataSource.getRepository(Complaint);

  const total = await repo.count();
  const pending = await repo.count({ where: { status: 'pending' } });
  const inProgress = await repo.count({ where: { status: 'in_progress' } });
  const resolved = await repo.count({ where: { status: 'resolved' } });

  res.json({ total, pending, inProgress, resolved });
};

