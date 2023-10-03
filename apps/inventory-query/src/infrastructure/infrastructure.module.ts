import {
  RabbitRegisterBranchUseCase,
  RabbitRegisterFinalCustomerSaleUseCase,
  RabbitRegisterProductInventoryStockUseCase,
  RabbitRegisterProductUseCase,
  RabbitRegisterResellerSaleUseCase,
  RabbitRegisterUserUseCase,
} from '@QueryApplication';
import {
  MessagingBranchHandler,
  MessagingProductHandler,
  MessagingUserHandler,
} from '@QueryInfrastructure';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import {
  BranchTypeOrmRepository,
  ProductTypeOrmRepository,
  UserTypeOrmRepository,
} from './database/repository';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'BRANCH_EX_1',
          type: 'topic',
        },
      ],

      uri: 'amqp://localhost:5672',
    }),
    DatabaseModule,
  ],
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
    {
      provide: MessagingBranchHandler,
      useFactory: (rabbitRegisterBranchUseCase: RabbitRegisterBranchUseCase) =>
        new MessagingBranchHandler(rabbitRegisterBranchUseCase),
      inject: [RabbitRegisterBranchUseCase],
    },
    {
      provide: MessagingProductHandler,
      useFactory: (
        registerProductUseCase: RabbitRegisterProductUseCase,
        registerProductInventoryStockUseCase: RabbitRegisterProductInventoryStockUseCase,
        registerFinalCustomerSaleUseCase: RabbitRegisterFinalCustomerSaleUseCase,
        registerResellerSaleUseCase: RabbitRegisterResellerSaleUseCase,
      ) =>
        new MessagingProductHandler(
          registerProductUseCase,
          registerProductInventoryStockUseCase,
          registerFinalCustomerSaleUseCase,
          registerResellerSaleUseCase,
        ),
      inject: [
        RabbitRegisterProductUseCase,
        RabbitRegisterProductInventoryStockUseCase,
        RabbitRegisterFinalCustomerSaleUseCase,
        RabbitRegisterResellerSaleUseCase,
      ],
    },
    {
      provide: MessagingUserHandler,
      useFactory: (registerUserUseCase: RabbitRegisterUserUseCase) =>
        new MessagingUserHandler(registerUserUseCase),
      inject: [RabbitRegisterUserUseCase],
    },
  ],
})
export class InfrastructureModule {}
