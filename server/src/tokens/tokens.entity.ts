import { Users } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class Tokens {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ unique: true })
  refreshToken!: string;
  @Column({ default: false })
  expire: boolean = false;
  @Column({ default: 1 })
  tokenVersion: number = 1;
  @Column({ type: 'text' })
  deviceId!: string;
  @ManyToOne(() => Users)
  user!: Users;
}
