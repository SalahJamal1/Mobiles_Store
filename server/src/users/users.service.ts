import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { GenericRepository } from 'src/contracts/generic-repository';

@Injectable()
export class UsersService extends GenericRepository<Users> {
  constructor(@InjectRepository(Users) protected repo: Repository<Users>) {
    super(repo);
  }
  async findByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    return user;
  }
}
