import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Role } from './role';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  fullName!: string;
  @Column()
  password!: string;
  @IsEmail()
  @Column({ unique: true })
  email!: string;
  @Column({ default: 1 })
  tokenVersion: number = 1;
  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: Role;
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
