import { Request, Response } from 'express';
import { AgencyService } from '../services/agency.service';

export const AgencyController = {
  async create(req: Request, res: Response) {
    try {
      const { name, description, email } = req.body;
      const agency = await AgencyService.create(name, description, email);
      res.status(201).json(agency);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, description, email } = req.body;
      const agency = await AgencyService.update(id, name, description, email);
      res.json(agency);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async list(req: Request, res: Response) {
    try {
      const agencies = await AgencyService.list();
      res.json(agencies);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
};
