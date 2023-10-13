import { IEventRepository, JWTModel } from '@Domain';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { EventMongooseRepository } from '../database';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(
    @Inject(EventMongooseRepository) private eventRepository: IEventRepository,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer ')
    ) {
      try {
        const token = request.headers.authorization.split(' ')[1];

        if (!jwt.verify(token, 'secret'))
          throw new UnauthorizedException('User not authorized');

        const decoded = jwt.decode(token) as JWTModel;

        if (decoded.userRole === 'super admin') {
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException('User not authorized');
      }
    }

    return false;
  }
}
