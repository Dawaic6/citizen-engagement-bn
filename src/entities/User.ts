import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeepPartial } from 'typeorm';
import { Complaint } from './Complaint';
import { StatusHistory } from './StatusHistory';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ default: 'citizen' }) // or 'admin'
  role!: string;

  @OneToMany(() => Complaint, complaint => complaint.user)
  complaints!: Complaint[];

  @OneToMany(() => StatusHistory, history => history.updatedBy)
  statusUpdates!: StatusHistory[];
    updatedBy: DeepPartial<User> | undefined;
}
