import { RabbitRegisterUserUseCase } from '@QueryApplication';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';

import { IUser, RegisterUserData } from '@Domain';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('api/v1/user')
export class QueryUserController {
  constructor(
    private readonly registerUserUseCase: RabbitRegisterUserUseCase,
  ) {}

  @EventPattern('USER_REGISTERED')
  registerUser(@Payload() dto: string): Observable<IUser> {
    const user: RegisterUserData = JSON.parse(dto);
    return this.registerUserUseCase.execute(user);
  }
}
