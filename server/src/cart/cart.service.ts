import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/contracts/generic-repository';
import { Cart } from './cart';
import { In, Repository } from 'typeorm';

@Injectable()
export class CartService extends GenericRepository<Cart> {
  constructor(@InjectRepository(Cart) protected repo: Repository<Cart>) {
    super(repo);
  }

  findWithMobiles(ids: number[]): Promise<Cart[]> {
    return this.repo.find({
      where: { id: In(ids) },
      relations: { item: true },
    });
  }
}
