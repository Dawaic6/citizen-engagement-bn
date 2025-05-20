import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Complaint } from '../entities/Complaint';
import { Agency } from '../entities/Agency';
import { Category } from '../entities/Category';
import { StatusHistory } from '../entities/StatusHistory';
import dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Make sure this is being read
  ssl: true, // Required for Neon
  extra: {
    ssl: {
      rejectUnauthorized: false // Needed for some cloud providers
    }
  },
  synchronize: true,
  logging: false, // Enable temporarily for debugging
  entities: [User, Complaint, Agency, Category, StatusHistory],
  migrations: [],
  subscribers: [],
});
