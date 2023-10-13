import { RegisterUserData } from '@Domain';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { RegisterUserListenerUseCase } from '../../application/register-user.use-case';

@Injectable()
export class MessagingUserHandler {
  constructor(
    private readonly registerUserUseCase: RegisterUserListenerUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'USER_REGISTERED',
    queue: 'USER_REGISTERED_AUTH',
  })
  registerBranch(dto: string): void {
    const branch: RegisterUserData = JSON.parse(dto);

    this.registerUserUseCase.execute(branch);
  }
}
