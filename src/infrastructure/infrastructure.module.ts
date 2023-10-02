import {
  RegisterBranchUseCase,
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
  RegisterUserUseCase,
} from '@Application';
import { Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { BranchController } from './controller/branch.controller';
import { ProductsController } from './controller/product.controller';
import { RabbitController } from './controller/rabbit.controller';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from './database/database.module';
import {
  BranchTypeOrmRepository,
  EventMongooseRepository,
  ProductTypeOrmRepository,
  UserTypeOrmRepository,
} from './database/repository';
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
      useFactory: (
        branchRepository: BranchTypeOrmRepository,
        commandBus: CommandBus,
      ) => new RegisterBranchUseCase(branchRepository, commandBus),
      inject: [BranchTypeOrmRepository, CommandBus],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (
        userRepository: UserTypeOrmRepository,
        branchRepository: BranchTypeOrmRepository,
        commandBus: CommandBus,
      ) =>
        new RegisterUserUseCase(userRepository, branchRepository, commandBus),
      inject: [UserTypeOrmRepository, BranchTypeOrmRepository, CommandBus],
    },
    {
      provide: RegisterProductUseCase,
      useFactory: (
        productRepository: ProductTypeOrmRepository,
        branchRepository: BranchTypeOrmRepository,
        commandBus: CommandBus,
      ) =>
        new RegisterProductUseCase(
          productRepository,
          branchRepository,
          commandBus,
        ),
      inject: [ProductTypeOrmRepository, BranchTypeOrmRepository, CommandBus],
    },
    {
      provide: RegisterProductInventoryStockUseCase,
      useFactory: (
        productRepository: ProductTypeOrmRepository,
        commandBus: CommandBus,
      ) =>
        new RegisterProductInventoryStockUseCase(productRepository, commandBus),
      inject: [ProductTypeOrmRepository, CommandBus],
    },
    {
      provide: RegisterFinalCustomerSaleUseCase,
      useFactory: (
        productRepository: ProductTypeOrmRepository,
        commandBus: CommandBus,
      ) => new RegisterFinalCustomerSaleUseCase(productRepository, commandBus),
      inject: [ProductTypeOrmRepository, CommandBus],
    },
    {
      provide: RegisterResellerSaleUseCase,
      useFactory: (
        productRepository: ProductTypeOrmRepository,
        commandBus: CommandBus,
      ) => new RegisterResellerSaleUseCase(productRepository, commandBus),
      inject: [ProductTypeOrmRepository, CommandBus],
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
    BranchController,
    ProductsController,
    UserController,
    RabbitController,
  ],
})
export class InfrastructureModule {}
