import {
  RegisterBranchUseCase,
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
  RegisterUserUseCase,
} from '@CommandApplication';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { CommandBranchController } from './controller/branch.controller';
import { CommandProductsController } from './controller/product.controller';
import { CommandUserController } from './controller/user.controller';
import { DatabaseModule } from './database/database.module';
import { EventMongooseRepository } from './database/repository';
import { CommandBus } from './listener/command.bus';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'BRANCH_EX_1',
          type: 'topic',
        },
        {
          name: 'BRANCH_EX_2',
          type: 'direct',
        },
        {
          name: 'BRANCH_EX_3',
          type: 'fanout',
        },
      ],
      uri: 'amqp://rabbitmq-inventory:5672',
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: RegisterBranchUseCase,
      useFactory: (commandBus: CommandBus) =>
        new RegisterBranchUseCase(commandBus),
      inject: [CommandBus],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (commandBus: CommandBus) =>
        new RegisterUserUseCase(commandBus),
      inject: [CommandBus],
    },
    {
      provide: RegisterProductUseCase,
      useFactory: (commandBus: CommandBus) =>
        new RegisterProductUseCase(commandBus),
      inject: [CommandBus],
    },
    {
      provide: RegisterProductInventoryStockUseCase,
      useFactory: (commandBus: CommandBus) =>
        new RegisterProductInventoryStockUseCase(commandBus),
      inject: [CommandBus],
    },
    {
      provide: RegisterFinalCustomerSaleUseCase,
      useFactory: (commandBus: CommandBus) =>
        new RegisterFinalCustomerSaleUseCase(commandBus),
      inject: [CommandBus],
    },
    {
      provide: RegisterResellerSaleUseCase,
      useFactory: (commandBus: CommandBus) =>
        new RegisterResellerSaleUseCase(commandBus),
      inject: [CommandBus],
    },
    {
      provide: CommandBus,
      useFactory: (
        eventRepository: EventMongooseRepository,
        amqpConnection: AmqpConnection,
      ) => new CommandBus(eventRepository, amqpConnection),
      inject: [EventMongooseRepository, AmqpConnection],
    },
  ],
  controllers: [
    CommandBranchController,
    CommandProductsController,
    CommandUserController,
  ],
})
export class InfrastructureModule {}
