import { JWTModel } from '@Domain';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable, of } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): Observable<boolean> {
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

        if (['admin', 'super admin'].includes(decoded.userRole)) {
          return of(true);
        }
      } catch (error) {
        throw new UnauthorizedException('User not authorized');
      }
    }

    return of(false);
  }
}
