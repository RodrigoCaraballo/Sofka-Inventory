import { RegisterUserUseCase } from '@Application';
import { IUser } from '@Interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, tap } from 'rxjs';

import { RegisterUserDTO } from '../dto/register-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  registerUser(@Body() dto: RegisterUserDTO): Observable<IUser> {
    return this.registerUserUseCase.execute({ eventData: dto }).pipe(
      tap((user: IUser) =>
        this.eventEmitter.emit('register-event', {
          eventType: 'USER_REGISTERED',
          eventData: JSON.stringify(user),
        }),
      ),
    );
  }
}
