import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/order';
import { Product } from 'src/product/product';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;
  @ApiProperty()
  @Column({ nullable: false })
  quantity!: number;
  @ApiProperty()
  @Column({ nullable: false })
  totalPrice!: number;

  @ApiProperty()
  @ManyToOne(() => Product)
  item!: Product;

  @ManyToOne(() => Order, (order) => order.cart)
  order!: Order;
}
