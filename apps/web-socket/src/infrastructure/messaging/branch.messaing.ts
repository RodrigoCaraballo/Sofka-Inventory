import { RegisterBranchData } from '@Domain';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingBranchHandler {
  constructor() {}

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'BRANCH_REGISTERED',
    queue: 'BRANCH_REGISTERED_WS',
  })
  registerBranchEvent(dto: string): void {
    const branch: RegisterBranchData = JSON.parse(dto);

    console.log(branch);
  }
}
