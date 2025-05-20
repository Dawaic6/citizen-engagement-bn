import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export const CategoryController = {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await CategoryService.create(name);
      res.status(201).json(category);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name } = req.body;
      const category = await CategoryService.update(id, name);
      res.json(category);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const categories = await CategoryService.list();
      res.json(categories);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};
