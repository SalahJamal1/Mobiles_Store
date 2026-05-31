import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export class GenericRepository<T extends ObjectLiteral> {
  constructor(protected repo: Repository<T>) {}
  async findAllByPage(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * 10;

    const [data, total] = await this.repo.findAndCount({
      skip,
      take: limit,
    });
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
  async findAll(): Promise<T[]> {
    return await this.repo.find();
  }
  async findById(id: number): Promise<T> {
    const entity = await this.repo.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });
    if (!entity) {
      throw new NotFoundException(
        `${this.repo.metadata.name} with id ${id} not found`,
      );
    }
    return entity;
  }
  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repo.create(entity);
    return await this.repo.save(newEntity);
  }

  async update(id: number, entity: DeepPartial<T>): Promise<T> {
    await this.repo.update(id, entity as any);

    return await this.findById(id);
  }
  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}
