import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { Authorized } from 'src/guard/auth.guard';

import { CurrentUser } from 'src/users/decorator/current.users';
import { Users } from 'src/users/users.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/orders')
export class OrderController {
  constructor(protected service: OrderService) {}

  @ApiOperation({ summary: 'Get orders for current user' })
  @ApiResponse({ status: 200 })
  @Get()
  @Authorized()
  getOrderByUser(@CurrentUser() user: Users) {
    return this.service.getOrders(user);
  }
}
