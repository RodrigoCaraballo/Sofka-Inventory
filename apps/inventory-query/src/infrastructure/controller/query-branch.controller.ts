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

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_2',
    routingKey: 'direct.*',
    queue: 'directRabbit2',
  })
  subDirectDos(dto: string): void {
    console.log(`subDirect: ${dto}`);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'topic',
    queue: 'topic',
  })
  subTopicOne(dto: string): void {
    console.log(`subTopicOne: ${dto}`);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_1',
    routingKey: 'topic.s',
    queue: 'topic.rabb',
  })
  subTopicTwo(dto: string): void {
    console.log(`subTopicTwo: ${dto}`);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_3',
    routingKey: 'dsad',
    queue: 'fanout.one',
  })
  subFanOut(dto: string): void {
    console.log(`subTopicTwo: ${dto}`);
  }

  @RabbitSubscribe({
    exchange: 'BRANCH_EX_3',
    routingKey: 'sas',
    queue: 'fanout.two',
  })
  subFanOutTwo(dto: string): void {
    console.log(`subFanOutTwo: ${dto}`);
  }
}
