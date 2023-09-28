import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, tap } from 'rxjs';
import { RegisterUserUseCase } from '../../application/register-user.use-case';
import { IUser } from '../../domain/interfaces';
import { RegisterUserDTO } from '../dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  registerUser(@Body() dto: RegisterUserDTO): Observable<IUser> {
    return this.registerUserUseCase.execute(dto).pipe(
      tap((user: IUser) =>
        this.eventEmitter.emit('register-event', {
          eventType: 'USER_REGISTERED',
          eventData: JSON.stringify(user),
        }),
      ),
    );
  }
}
