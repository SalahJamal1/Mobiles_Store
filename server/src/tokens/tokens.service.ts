import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from './tokens.entity';
import { Repository } from 'typeorm';
import { GenericRepository } from 'src/contracts/generic-repository';

@Injectable()
export class TokensService extends GenericRepository<Tokens> {
  constructor(@InjectRepository(Tokens) protected repo: Repository<Tokens>) {
    super(repo);
  }

  async revokeAllValidTokenByUserIdAndDeviceId(
    deviceId: string,
    userId: number,
  ) {
    await this.repo.update(
      {
        deviceId: deviceId,
        user: { id: userId },
        expire: false,
      },
      { expire: true },
    );
  }
  async findTokenByRefreshTokenAndDeviceId(token: string, deviceId: string) {
    return await this.repo.findOne({
      where: { refreshToken: token, deviceId, expire: false },
      relations: { user: true },
    });
  }
}
