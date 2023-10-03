import { RabbitRegisterUserUseCase } from '@QueryApplication';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { IUser, RegisterUserData } from '@Domain';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';

@Injectable()
export class MessagingUserHandler {
  constructor(
    private readonly registerUserUseCase: RabbitRegisterUserUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'USER_REGISTERED',
    queue: 'USER_REGISTERED',
  })
  registerUser(@Payload() dto: string): Observable<IUser> {
    const user: RegisterUserData = JSON.parse(dto);
    return this.registerUserUseCase.execute(user);
  }
}
