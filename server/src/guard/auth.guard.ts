import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

export function Authorized() {
  return UseGuards(AuthGuard);
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const auth: string = req.headers['authorization'];

    if (!auth || !auth.startsWith('Bearer ')) {
      throw new UnauthorizedException('you are unauthorized');
    }

    const token = auth.substring(7);
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      if (payload.uid === undefined || payload['tv'] === undefined) {
        throw new UnauthorizedException('Invalid token payload');
      }
      const user = await this.userService.findById(payload.uid);
      if (user.tokenVersion !== payload['tv']) {
        throw new UnauthorizedException('Invalid token');
      }
      req['user'] = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token payload');
    }
  }
}
