import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { CartModule } from 'src/cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order';
import { OrderController } from './order.controller';
import { UsersModule } from 'src/users/users.module';
import { MobilesModule } from 'src/product/product.module';

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    MobilesModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
