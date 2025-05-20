import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Agency } from './Agency';
import { Category } from './Category';
import { StatusHistory } from './StatusHistory';

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  subject!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ default: 'pending' }) // e.g., pending, in_progress, resolved
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, user => user.complaints)
  user!: User;

  @ManyToOne(() => Agency, agency => agency.complaints)
  agency!: Agency;

  @ManyToOne(() => Category, category => category.complaints)
  category!: Category;

  @OneToMany(() => StatusHistory, history => history.complaint)
  statusHistory!: StatusHistory[];
}
