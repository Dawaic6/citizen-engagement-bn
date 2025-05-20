import { AppDataSource } from '../config/data-source';
import { Complaint } from '../entities/Complaint';
import { StatusHistory } from '../entities/StatusHistory';
import { User } from '../entities/User';

const complaintRepo = AppDataSource.getRepository(Complaint);
const statusRepo = AppDataSource.getRepository(StatusHistory);
const userRepo = AppDataSource.getRepository(User);

export const AdminService = {
  async getAllComplaints(status?: string) {
    const where = status ? { status } : {};
    return complaintRepo.find({
      where,
      relations: ['user', 'category', 'agency'],
      order: { createdAt: 'DESC' }
    });
  },

  async updateStatus(complaintId: number, status: string, comment: string, adminId: number) {
    const complaint = await complaintRepo.findOneBy({ id: complaintId });
    if (!complaint) throw new Error('Complaint not found');

    complaint.status = status;
    await complaintRepo.save(complaint);

    const admin = await userRepo.findOneBy({ id: adminId });
    const history = statusRepo.create({
      status,
      comment,
      updatedBy: admin?.updatedBy,
      complaint
    });
    await statusRepo.save(history);

    return complaint;
  },

  async getComplaintDetail(complaintId: number) {
    const complaint = await complaintRepo.findOne({
      where: { id: complaintId },
      relations: ['user', 'category', 'agency', 'statusHistory', 'statusHistory.updatedBy']
    });
    if (!complaint) throw new Error('Complaint not found');
    return complaint;
  }
};
