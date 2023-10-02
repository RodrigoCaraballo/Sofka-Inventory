import {
  RegisterBranchUseCase,
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
  RegisterUserUseCase,
} from '@CommandApplication';
import { Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { CommandBranchController } from './controller/branch.controller';
import { CommandProductsController } from './controller/product.controller';
import { CommandUserController } from './controller/user.controller';
import { DatabaseModule } from './database/database.module';
import { EventMongooseRepository } from './database/repository';
import { CommandBus } from './listener/command.bus';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BRANCH_RMQ',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'BRANCH_QUEUE',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
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
        clientProxy: ClientProxy,
      ) => new CommandBus(eventRepository, clientProxy),
      inject: [EventMongooseRepository, 'BRANCH_RMQ'],
    },
  ],
  controllers: [
    CommandBranchController,
    CommandProductsController,
    CommandUserController,
  ],
})
export class InfrastructureModule {}
