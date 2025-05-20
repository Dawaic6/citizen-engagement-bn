import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;
      const { user, token } = await AuthService.register(name, email, password , role);
      res.status(201).json({ user, token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  },

  async login(req: Request, res: Response) { 
    try {
      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);
      res.status(200).json({ user, token });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
};
