import { AppDataSource } from '../config/data-source';
import { Category } from '../entities/Category';

const categoryRepo = AppDataSource.getRepository(Category);

export const CategoryService = {
  async create(name: string) {
    const existing = await categoryRepo.findOneBy({ name });
    if (existing) throw new Error('Category already exists');

    const category = categoryRepo.create({ name });
    await categoryRepo.save(category);
    return category;
  },

  async update(id: number, name: string) {
    const category = await categoryRepo.findOneBy({ id });
    if (!category) throw new Error('Category not found');

    category.name = name;
    await categoryRepo.save(category);
    return category;
  },

  async list() {
    return categoryRepo.find({ order: { name: 'ASC' } });
  }
};
