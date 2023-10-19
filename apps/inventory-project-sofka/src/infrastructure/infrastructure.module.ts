import {
  RegisterBranchUseCase,
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
  RegisterUserUseCase,
} from '@CommandApplication';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { RegisterReturnSaleUseCase } from '../application/register-return-sale.use-case';
import { CommandBranchController } from './controller/branch.controller';
import { CommandProductsController } from './controller/product.controller';
import { CommandUserController } from './controller/user.controller';
import { DatabaseModule } from './database/database.module';
import { EventMongooseRepository } from './database/repository';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/authorization.guard';
import { SuperAdminGuard } from './guards/super-user.guard';
import { CommandBus } from './listener/command.bus';
import { EventMongooseSeedService } from './seed';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'BRANCH_EX_1',
          type: 'topic',
        },
      ],
      uri: process.env.RABBIT_MQ_URI || 'amqp://127.0.0.1:5672/',
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
      provide: RegisterResellerSaleUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) => new RegisterResellerSaleUseCase(eventRepository, commandBus),
      inject: [EventMongooseRepository, CommandBus],
    },
    {
      provide: RegisterReturnSaleUseCase,
      useFactory: (
        eventRepository: EventMongooseRepository,
        commandBus: CommandBus,
      ) => new RegisterReturnSaleUseCase(eventRepository, commandBus),
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
    {
      provide: EventMongooseSeedService,
      useFactory: (eventRepository: EventMongooseRepository) =>
        new EventMongooseSeedService(eventRepository),
      inject: [EventMongooseRepository],
    },
    AuthGuard,
    SuperAdminGuard,
    AdminGuard,
  ],
  controllers: [
    CommandBranchController,
    CommandProductsController,
    CommandUserController,
  ],
})
export class InfrastructureModule implements OnApplicationBootstrap {
  constructor(private readonly seedService: EventMongooseSeedService) {}

  onApplicationBootstrap() {
    this.seedService.seedData();
  }
}
