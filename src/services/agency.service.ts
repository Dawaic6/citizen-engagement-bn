import { AppDataSource } from '../config/data-source';
import { Agency } from '../entities/Agency';

const agencyRepo = AppDataSource.getRepository(Agency);

export const AgencyService = {
  async create(name: string, description: string, email: any) {
    const existing = await agencyRepo.findOneBy({ name });
    if (existing) throw new Error('Agency already exists');

    const agency = agencyRepo.create({ name, description });
    await agencyRepo.save(agency);
    return agency;
  },

  async update(id: number, name: string, description: string, email: any) {
    const agency = await agencyRepo.findOneBy({ id });
    if (!agency) throw new Error('Agency not found');

    agency.name = name;
    agency.description = description;
    await agencyRepo.save(agency);
    return agency;
  },

  async list() {
    return agencyRepo.find({ order: { name: 'ASC' } });
  }
};
