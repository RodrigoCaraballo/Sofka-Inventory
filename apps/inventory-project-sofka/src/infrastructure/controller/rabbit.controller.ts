import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Controller, Post } from '@nestjs/common';
@Controller('rabbit')
export class RabbitController {
  constructor(private readonly ampq: AmqpConnection) {}

  @Post('direct')
  directRabbit(): void {
    this.ampq.publish('BRANCH_EX_2', 'direct.rabbit', 'directRabbit');
  }

  @Post('topic')
  topicRabbit(): void {
    this.ampq.publish('BRANCH_EX_1', 'topic.*', 'topicRabbit');
  }

  @Post('fanout')
  fanoutRabbit(): void {
    this.ampq.publish('BRANCH_EX_3', '', 'fanoutRabbit');
  }
}
