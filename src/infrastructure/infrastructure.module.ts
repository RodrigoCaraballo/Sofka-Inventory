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
import { RegisterEventListener } from './listener/register-event.use-case';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: RegisterBranchUseCase,
      useFactory: (
        branchRepository: BranchTypeOrmRepository,
        userRepository: UserTypeOrmRepository,
      ) => new RegisterBranchUseCase(branchRepository, userRepository),
      inject: [BranchTypeOrmRepository, UserTypeOrmRepository],
    },
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository: UserTypeOrmRepository) =>
        new RegisterUserUseCase(userRepository),
      inject: [UserTypeOrmRepository],
    },
    {
      provide: RegisterProductUseCase,
      useFactory: (
        branchRepository: BranchTypeOrmRepository,
        productRepository: ProductTypeOrmRepository,
      ) => new RegisterProductUseCase(branchRepository, productRepository),
      inject: [BranchTypeOrmRepository, UserTypeOrmRepository],
    },
    {
      provide: RegisterProductInventoryStockUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RegisterProductInventoryStockUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: RegisterFinalCustomerSaleUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RegisterFinalCustomerSaleUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: RegisterResellerSaleUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RegisterResellerSaleUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: RegisterEventListener,
      useFactory: (eventRepository: EventMongooseRepository) =>
        new RegisterEventListener(eventRepository),
      inject: [EventMongooseRepository],
    },
  ],
  controllers: [BranchController, ProductsController, UserController],
})
export class InfrastructureModule {}
