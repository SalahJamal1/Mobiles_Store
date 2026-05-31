import { BadRequestException, Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/contracts/generic-repository';
import { Order } from './order';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';

import { CreateOrderDto } from './dto/create-order-dto';
import { ProductService } from 'src/product/product.service';
import { Status } from './status';

@Injectable()
export class OrderService extends GenericRepository<Order> {
  constructor(
    @InjectRepository(Order) protected repo: Repository<Order>,
    protected productService: ProductService,
  ) {
    super(repo);
  }

  async createOrder(user: Users, order: CreateOrderDto) {
    if (!order.cart?.length) {
      throw new BadRequestException('Cart is empty');
    }
    const ids = order.cart.map((cart) => cart.item.id);
    const products = await this.productService.findMobiles(ids);
    if (!products?.length) {
      throw new BadRequestException('Some products are not found');
    }

    order.cart = order.cart.map((cart) => {
      const product = products.find((product) => product.id === cart.item.id);
      if (!product) {
        throw new BadRequestException('Some products are not found');
      }
      cart.totalPrice = product.price * cart.quantity;
      cart.item = product;
      return cart;
    });
    const newOrder: Order = {
      ...order,
      user,
    };
    const entity = this.repo.create(newOrder);
    return this.repo.save(entity);
  }
  async getOrders(user: Users) {
    const orders = await this.repo.find({
      where: { user: { id: user.id } },
      relations: { cart: { item: true } },
    });
    if (!orders?.length) {
      return [];
    }
    const now = Date.now();
    for (const order of orders) {
      const createdAt = order.date!.getTime();

      if (now - createdAt >= 24 * 60 * 60 * 1000) {
        order.status = Status.DELIVERED;
        order.step = 3;
      } else if (now - createdAt >= 15 * 60 * 1000) {
        order.status = Status.SHIPPED;
        order.step = 2;
      }

      await this.repo.save(order);
    }
    return orders;
  }
}
