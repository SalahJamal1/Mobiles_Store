import { Injectable } from '@nestjs/common';
import { Categories } from './categories';
import { GenericRepository } from 'src/contracts/generic-repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService extends GenericRepository<Categories> {
  constructor(
    @InjectRepository(Categories) protected repo: Repository<Categories>,
  ) {
    super(repo);
  }
}
