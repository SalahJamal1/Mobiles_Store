import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Authorized } from './guard/auth.guard';
import { CurrentUser } from './users/decorator/current.users';
import { Users } from './users/users.entity';
import { Serializer } from './interceptor/serializer.interceptor';
import { UserDto } from './users/dto/users.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Authorized()
  @Serializer(UserDto)
  getHello(@CurrentUser() user: Users) {
    return user;
  }
}
