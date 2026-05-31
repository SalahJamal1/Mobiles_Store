import { AuthRegister } from './../users/dto/auth-register';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { TokensService } from 'src/tokens/tokens.service';
import { plainToInstance } from 'class-transformer';
import { Users } from 'src/users/users.entity';
import { type Request, Response } from 'express';
import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { Tokens } from 'src/tokens/tokens.entity';
import bcryptjs from 'bcryptjs';
import { AuthLogin } from 'src/users/dto/auth-login';
@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokensService,
    private usersService: UsersService,
  ) {}

  async register(req: Request, res: Response, authRegister: AuthRegister) {
    const isExist = await this.usersService.findByEmail(authRegister.email);
    if (isExist !== null) {
      throw new BadRequestException('The user is already exists');
    }

    if (authRegister.password !== authRegister.confirmPassword) {
      throw new BadRequestException("The Passwords doesn't match");
    }
    const user = plainToInstance(Users, authRegister);
    user.password = await bcryptjs.hash(user.password, 10);
    try {
      const savedUser = await this.usersService.create(user);
      const deviceId = this.getOrCreateDeviceId(req);
      const access_token = this.generateToken(savedUser, '15m');
      const refresh_token = this.generateToken(savedUser, '7d');
      const token = new Tokens();
      token.deviceId = deviceId;
      token.refreshToken = refresh_token;
      token.user = savedUser;
      token.tokenVersion = savedUser.tokenVersion;
      await this.tokenService.create(token);
      return { access_token, user: savedUser };
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }
  async login(req: Request, res: Response, authLogin: AuthLogin) {
    const user = await this.usersService.findByEmail(authLogin.email);
    if (user === null) {
      throw new BadRequestException('Invalid email or password');
    }

    const isValidPassword = await bcryptjs.compare(
      authLogin.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const deviceId = this.getOrCreateDeviceId(req);
    return await this.getAuthResponse(res, deviceId, user);
  }
  async refresh(req: Request, res: Response) {
    const refresh_jwt = req.headers['refresh_token'] as string;
    const deviceId = this.getDeviceId(req);
    if (!refresh_jwt || !deviceId) {
      throw new UnauthorizedException('Invalid token');
    }
    try {
      jwt.verify(refresh_jwt, process.env.SECRET_KEY!);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    const valid_token =
      await this.tokenService.findTokenByRefreshTokenAndDeviceId(
        refresh_jwt,
        deviceId,
      );
    if (!valid_token) {
      throw new UnauthorizedException('Invalid token');
    }

    const user = valid_token.user;
    if (valid_token.tokenVersion !== user.tokenVersion) {
      throw new UnauthorizedException('Invalid token');
    }

    return await this.getAuthResponse(res, deviceId, user);
  }

  async logout(req: Request, res: Response) {
    const deviceId = this.getDeviceId(req);
    const user: Users = req['user'];
    if (!deviceId || !user) {
      throw new UnauthorizedException('Invalid token');
    }
    user.tokenVersion++;
    res.clearCookie('jwt');
    await this.usersService.update(user.id, user);
    await this.tokenService.revokeAllValidTokenByUserIdAndDeviceId(
      deviceId,
      user.id,
    );
  }

  async getAuthResponse(res: Response, deviceId: string, user: Users) {
    await this.tokenService.revokeAllValidTokenByUserIdAndDeviceId(
      deviceId,
      user.id,
    );
    const access_token = this.generateToken(user, '15m');
    const refresh_token = this.generateToken(user, '7d');
    const token = new Tokens();
    token.deviceId = deviceId;
    token.refreshToken = refresh_token;
    token.user = user;
    token.tokenVersion = user.tokenVersion;
    await this.tokenService.create(token);
    return { access_token, user, refresh_token, deviceId };
  }

  getDeviceId(req: Request) {
    return (req.headers['deviceid'] as string) ?? null;
  }
  getOrCreateDeviceId(req: Request) {
    const deviceId = this.getDeviceId(req);
    if (deviceId != null) return deviceId;
    const newDeviceId = randomUUID();
    return newDeviceId;
  }

  setCookie(res: Response, key: string, value: string, maxAge: number) {
    res.cookie(key, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: maxAge * 24 * 60 * 60 * 1000,
    });
  }

  generateToken(user: Users, expiresIn: string) {
    const jti = randomUUID();
    return jwt.sign(
      { uid: user.id, sub: user.email, tv: user.tokenVersion, jti },
      process.env.SECRET_KEY!,
      {
        expiresIn: expiresIn as any,
      },
    );
  }
}
