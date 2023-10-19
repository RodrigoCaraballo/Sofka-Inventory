import { IEvent, IEventRepository, JWTModel, RegisterUserData } from '@Domain';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable, map, of } from 'rxjs';
import { EventMongooseRepository } from '../database';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(EventMongooseRepository) private eventRepository: IEventRepository,
  ) {}

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

        return this.eventRepository.existUser(decoded.userEmail).pipe(
          map((event: IEvent) => {
            const user = event.eventData as RegisterUserData;

            if (user.role) {
              return true;
            }
          }),
        );
      } catch (error) {
        throw new UnauthorizedException('User not authorized');
      }
    }

    return of(false);
  }
}
