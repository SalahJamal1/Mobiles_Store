import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/users.dto';

export class AuthResponseDto {
  @ApiProperty()
  @Expose()
  access_token!: string;
  @ApiProperty()
  @Expose()
  refresh_token!: string;

  @ApiProperty()
  @Expose()
  deviceId!: string;
  @ApiProperty({ type: UserDto })
  @Expose()
  @Type(() => UserDto)
  user!: UserDto;
}
