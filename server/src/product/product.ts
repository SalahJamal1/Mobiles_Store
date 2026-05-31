import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price!: number;

  @ApiProperty()
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  originalPrice?: number;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  image!: string;

  @ApiProperty()
  @Column()
  category!: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
    precision: 2,
    scale: 1,
  })
  rating!: number;

  @ApiProperty()
  @Column()
  reviews!: number;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  description!: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  badge?: string;

  @ApiProperty()
  @Column({
    default: true,
  })
  inStock!: boolean;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  discount?: number;

  @ApiProperty()
  @Column({
    type: 'json',
    nullable: true,
  })
  colorImages?: Record<string, string>;
}
