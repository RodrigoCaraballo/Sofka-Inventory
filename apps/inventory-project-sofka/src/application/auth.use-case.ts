import { IEvent, IEventRepository, RegisterUserData } from '@Domain';
import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Observable, map } from 'rxjs';
import { AuthData } from '../../../domain/interfaces/event-data/auth.data';
import { AuthReponse } from '../../../domain/interfaces/response/token.response';

export class AuthUseCase {
  constructor(private readonly eventRepository: IEventRepository) {}

  execute(data: AuthData): Observable<AuthReponse> {
    return this.eventRepository.authUser(data).pipe(
      map((event: IEvent) => {
        if (!event) throw new BadRequestException('Invalid user credentials');
        const user = event.eventData as RegisterUserData;
        const token = jwt.sign(
          {
            userId: user.id,
            userRole: user.role,
            branchId: event.eventAggregateRootId,
          },
          'secret',
        );

        return { token };
      }),
    );
  }
}
