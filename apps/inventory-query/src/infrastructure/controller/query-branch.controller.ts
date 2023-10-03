import { RegisterBranchData } from '@Domain';
import { RabbitRegisterBranchUseCase } from '@QueryApplication';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagingBranchHandler {
  constructor(
    private readonly registerBranchUseCase: RabbitRegisterBranchUseCase,
  ) {}

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'BRANCH_REGISTERED',
    queue: 'BRANCH_REGISTERED',
  })
  registerBranch(dto: string): void {
    const branch: RegisterBranchData = JSON.parse(dto);

    this.registerBranchUseCase.execute(branch);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_2',
    routingKey: 'direct.rabbit',
    queue: 'directRabbit',
  })
  subDirect(dto: string): void {
    console.log(`subDirect: ${dto}`);
  }
}
