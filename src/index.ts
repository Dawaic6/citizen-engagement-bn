import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/auth.routes';
import complaintRoutes from './routes/complaint.routes';
import adminRoutes from './routes/admin.routes';
import categoryRoutes from './routes/category.routes';
import agencyRoutes from './routes/agency.routes';



dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/agencies', agencyRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
  });
