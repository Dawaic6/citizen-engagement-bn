import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Complaint } from './Complaint';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true }) // Add this proper column definition
  description?: string; // Make optional with ?

  @OneToMany(() => Complaint, complaint => complaint.agency)
  complaints!: Complaint[];
}