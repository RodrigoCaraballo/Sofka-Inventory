import {
  RabbitRegisterBranchUseCase,
  RabbitRegisterFinalCustomerSaleUseCase,
  RabbitRegisterProductInventoryStockUseCase,
  RabbitRegisterProductUseCase,
  RabbitRegisterResellerSaleUseCase,
  RabbitRegisterUserUseCase,
} from '@QueryApplication';
import {
  QueryBranchController,
  QueryProductsController,
  QueryUserController,
} from '@QueryInfrastructure';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { DatabaseModule } from './database/database.module';
import {
  BranchTypeOrmRepository,
  ProductTypeOrmRepository,
  UserTypeOrmRepository,
} from './database/repository';

@Module({
  imports: [ClientsModule, DatabaseModule],
  providers: [
    {
      provide: RabbitRegisterBranchUseCase,
      useFactory: (branchRepository: BranchTypeOrmRepository) =>
        new RabbitRegisterBranchUseCase(branchRepository),
      inject: [BranchTypeOrmRepository],
    },
    {
      provide: RabbitRegisterUserUseCase,
      useFactory: (
        userRepository: UserTypeOrmRepository,
        branchRepository: BranchTypeOrmRepository,
      ) => new RabbitRegisterUserUseCase(userRepository, branchRepository),
      inject: [UserTypeOrmRepository, BranchTypeOrmRepository],
    },
    {
      provide: RabbitRegisterProductUseCase,
      useFactory: (
        productRepository: ProductTypeOrmRepository,
        branchRepository: BranchTypeOrmRepository,
      ) =>
        new RabbitRegisterProductUseCase(productRepository, branchRepository),
      inject: [ProductTypeOrmRepository, BranchTypeOrmRepository],
    },
    {
      provide: RabbitRegisterProductInventoryStockUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RabbitRegisterProductInventoryStockUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: RabbitRegisterFinalCustomerSaleUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RabbitRegisterFinalCustomerSaleUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: RabbitRegisterResellerSaleUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RabbitRegisterResellerSaleUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
    },
  ],
  controllers: [
    QueryBranchController,
    QueryProductsController,
    QueryUserController,
  ],
})
export class InfrastructureModule {}
