import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { OrderModule } from 'src/order/order.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [OrderModule, UsersModule],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
