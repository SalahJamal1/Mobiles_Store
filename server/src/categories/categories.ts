import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty()
  @Column()
  name!: string;
  @ApiProperty()
  @Column()
  icon!: string;
  @ApiProperty()
  @Column()
  count!: number;
}
