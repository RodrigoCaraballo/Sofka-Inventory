import {
  RegisterBranchUseCase,
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
  RegisterUserUseCase,
} from '@Application';
import { Module } from '@nestjs/common';
import { BranchController } from './controller/branch.controller';
import { ProductsController } from './controller/product.controller';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from './database/database.module';
import {
  BranchTypeOrmRepository,
  EventMongooseRepository,
  ProductTypeOrmRepository,
  UserTypeOrmRepository,
} from './database/repository';
import { CommandBus } from './listener/register-event.use-case';

@Module({
  imports: [DatabaseModule],
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
      useFactory: (eventRepository: EventMongooseRepository) =>
        new CommandBus(eventRepository),
      inject: [EventMongooseRepository],
    },
  ],
  controllers: [BranchController, ProductsController, UserController],
})
export class InfrastructureModule {}
