import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

const userRepo = AppDataSource.getRepository(User);

export const AuthService = {
  async register(name: string, email: string, password: string, role: any) {
    const existing = await userRepo.findOneBy({ email });
    if (existing) throw new Error('Email already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepo.create({ name, email, password: hashed });
    await userRepo.save(user);

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  },

  async login(email: string, password: string) {
    const user = await userRepo.findOneBy({ email });
    if (!user) throw new Error('Invalid email or password');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid email or password');

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  },
};
