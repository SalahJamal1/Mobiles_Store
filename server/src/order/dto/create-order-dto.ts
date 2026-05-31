import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
import { Cart } from 'src/cart/cart';

export class CreateOrderDto {
  @IsString()
  @ApiProperty()
  customerName!: string;

  @IsString()
  @ApiProperty()
  phone!: string;

  @IsObject()
  @ApiProperty()
  location!: {
    lat: number;
    lng: number;
  };

  @IsArray()
  @ApiProperty()
  cart!: Cart[];

  @IsNumber()
  orderPrice!: number;
}
