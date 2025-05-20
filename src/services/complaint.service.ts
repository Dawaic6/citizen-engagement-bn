import { AppDataSource } from '../config/data-source';
import { Complaint } from '../entities/Complaint';
import { Category } from '../entities/Category';
import { Agency } from '../entities/Agency';
import { User } from '../entities/User';

const complaintRepo = AppDataSource.getRepository(Complaint);
const categoryRepo = AppDataSource.getRepository(Category);
const agencyRepo = AppDataSource.getRepository(Agency);
const userRepo = AppDataSource.getRepository(User);

export const ComplaintService = {
  async submitComplaint(userId: number, subject: string, description: string, categoryId: number, agencyId: any) {
    const user = await userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const category = await categoryRepo.findOne({ where: { id: categoryId }, relations: ['complaints'] });
    if (!category) throw new Error('Invalid category');

    // For simplicity: one category is assigned to one agency
    const agency = await agencyRepo.findOne({ where: {}, order: { id: 'ASC' } }); // or logic to map
    if (!agency) throw new Error('No agency found');

    const complaint = complaintRepo.create({
      subject,
      description,
      user,
      category,
      agency,
      status: 'pending'
    });

    await complaintRepo.save(complaint);
    return complaint;
  },

  async getUserComplaints(userId: number) {
    return complaintRepo.find({
      where: { user: { id: userId } },
      relations: ['category', 'agency'],
      order: { createdAt: 'DESC' }
    });
  }
};
