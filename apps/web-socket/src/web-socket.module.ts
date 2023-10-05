import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagingBranchHandler } from './infrastructure/messaging/branch.messaing';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'BRANCH_EX_1',
          type: 'topic',
        },
      ],

      uri: process.env.RABBIT_MQ_URI,
    }),
  ],
  providers: [
    {
      provide: MessagingBranchHandler,
      useFactory: () => new MessagingBranchHandler(),
      inject: [],
    },
  ],
})
export class WebSocketModule {}
