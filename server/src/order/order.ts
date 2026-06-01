import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/cart.entity';
import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status';
interface Location {
  lat: number;
  lng: number;
}

@Entity('order')
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;
  @ApiProperty()
  @Column({ nullable: false })
  customerName!: string;
  @ApiProperty()
  @Column({ nullable: false })
  phone!: string;
  @ApiProperty()
  @Column({ type: 'json', nullable: false })
  location!: Location;
  @ApiProperty()
  @OneToMany(() => Cart, (cart) => cart.order, { cascade: true })
  cart!: Cart[];
  @CreateDateColumn()
  date?: Date;
  @ApiProperty()
  @Column({ default: Status.PROCESSING, type: 'enum', enum: Status })
  status?: Status;
  @ApiProperty()
  @Column({ default: 1, type: 'int' })
  step?: number;
  @ApiProperty()
  @Column({ default: false })
  isPaid?: boolean = false;
  @ApiProperty()
  @Column({ nullable: true })
  orderReference?: string;
  @ApiProperty()
  @Column({ type: 'decimal', precision: 8, scale: 2 })
  orderPrice!: number;
  @ManyToOne(() => Users)
  user?: Users;
}
