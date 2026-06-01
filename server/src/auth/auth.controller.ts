import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { type Request, type Response } from 'express';
import { AuthService } from './auth.service';
import { AuthRegister } from 'src/users/dto/auth-register';
import { AuthLogin } from 'src/users/dto/auth-login';
import { Serializer } from 'src/interceptor/serializer.interceptor';
import { AuthResponseDto } from 'src/users/dto/auth-response';
import { Authorized } from 'src/guard/auth.guard';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @Post('register')
  register(@Req() req: Request, @Body() authRegister: AuthRegister) {
    return this.service.register(req, authRegister);
  }
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @Post('login')
  @Serializer(AuthResponseDto)
  login(
    @Req() req: Request,

    @Body() authLogin: AuthLogin,
  ) {
    return this.service.login(req, authLogin);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  @Post('refresh')
  @Serializer(AuthResponseDto)
  refresh(@Req() req: Request) {
    return this.service.refresh(req);
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @Post('logout')
  @Authorized()
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.service.logout(req, res);
  }
}
