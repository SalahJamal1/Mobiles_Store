import { OrderService } from './../order/order.service';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { Authorized } from 'src/guard/auth.guard';
import { CreateOrderDto } from 'src/order/dto/create-order-dto';
import { CurrentUser } from 'src/users/decorator/current.users';
import { Users } from 'src/users/users.entity';
import Stripe from 'stripe';
@Controller('api/v1/payments')
export class PaymentsController {
  key: string = process.env.STRIP_SECRET_KEY ?? '';
  wh_sec: string = process.env.STRIP_WH_SEC ?? '';
  stripeClient: any;
  constructor(private orderService: OrderService) {
    this.stripeClient = new Stripe(this.key);
  }

  @Authorized()
  @Post('create-checkout-session')
  async createCheckout(
    @CurrentUser() user: Users,
    @Body() createOrder: CreateOrderDto,
  ) {
    const order = await this.orderService.createOrder(user, createOrder);
    const session = await this.stripeClient.checkout.sessions.create({
      mode: 'payment',
      metadata: {
        orderId: order.id,
      },

      line_items: [
        {
          price_data: {
            currency: 'usd',

            product_data: {
              name: 'Product Order',

              images: [
                order.cart[0].item.image ??
                  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
              ],
            },

            unit_amount: Math.round(order.orderPrice * 100),
          },

          quantity: 1,
        },
      ],

      success_url: 'mobiles://profile',

      cancel_url: 'mobiles://cart',
    });

    return { url: session.url };
  }
  @Post('webhook')
  async webhook(@Req() request: Request) {
    try {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      const event = this.stripeClient.webhooks.constructEvent(
        request.body,
        signature,
        this.wh_sec,
      );
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        const order = await this.orderService.findById(orderId);
        order.isPaid = true;
        order.orderReference = session.id;
        await this.orderService.update(orderId, order);
      }
      return { received: true };
    } catch (err: any) {
      throw new BadRequestException(
        `⚠️ Webhook signature verification failed.`,
        err.message,
      );
    }
  }
}
