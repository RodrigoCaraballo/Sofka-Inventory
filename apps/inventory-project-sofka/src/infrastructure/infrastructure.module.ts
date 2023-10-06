import {
  AuthUseCase,
  RegisterBranchUseCase,
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
  RegisterUserUseCase,
} from '@CommandApplication';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
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
      ],
      uri: process.env.RABBIT_MQ_URI,
    }),
    DatabaseModule,
  ],
  providers: [
    {
      provide: RegisterBranchUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) => new RegisterBranchUseCase(eventRepository, commandBus),
      inject: [EventMongooseRepository, CommandBus],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) => new RegisterUserUseCase(eventRepository, commandBus),
      inject: [EventMongooseRepository, CommandBus],
    },
    {
      provide: RegisterProductUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) => new RegisterProductUseCase(eventRepository, commandBus),
      inject: [EventMongooseRepository, CommandBus],
    },
    {
      provide: RegisterProductInventoryStockUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) =>
        new RegisterProductInventoryStockUseCase(eventRepository, commandBus),
      inject: [EventMongooseRepository, CommandBus],
    },
    {
      provide: RegisterFinalCustomerSaleUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) => new RegisterFinalCustomerSaleUseCase(eventRepository, commandBus),
      inject: [EventMongooseRepository, CommandBus],
    },
    {
      provide: AuthUseCase,
      useFactory: (eventRepository: EventMongooseRepository) =>
        new AuthUseCase(eventRepository),
      inject: [EventMongooseRepository],
    },
    {
      provide: RegisterResellerSaleUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) => new RegisterResellerSaleUseCase(eventRepository, commandBus),
      inject: [EventMongooseRepository, CommandBus],
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
    AuthController,
  ],
})
export class InfrastructureModule {}
