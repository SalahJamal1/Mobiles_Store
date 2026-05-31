import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
