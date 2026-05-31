import { Injectable } from '@nestjs/common';
import { GenericRepository } from 'src/contracts/generic-repository';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product';

@Injectable()
export class ProductService extends GenericRepository<Product> {
  constructor(@InjectRepository(Product) protected repo: Repository<Product>) {
    super(repo);
  }
  findMobiles(ids: number[]): Promise<Product[]> {
    return this.repo.find({
      where: { id: In(ids) },
    });
  }
}
