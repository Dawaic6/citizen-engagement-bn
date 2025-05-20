import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Complaint } from './Complaint';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Complaint, complaint => complaint.category)
  complaints!: Complaint[];
}
