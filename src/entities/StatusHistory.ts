import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import "reflect-metadata";
import { Complaint } from './Complaint';
import { User } from './User';

@Entity()
export class StatusHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  status!: string;

  @Column({ type: 'text', nullable: true })
  comment!: string;

  @CreateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => Complaint, complaint => complaint.statusHistory)
  complaint!: Complaint;

  @ManyToOne(() => User, user => user.statusUpdates)
  updatedBy!: User;
}
