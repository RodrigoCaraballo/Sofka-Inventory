import {
  GetBranchUseCase,
  GetSalesUseCase,
  RabbitRegisterBranchUseCase,
  RabbitRegisterFinalCustomerSaleUseCase,
  RabbitRegisterProductInventoryStockUseCase,
  RabbitRegisterProductUpdateUseCase,
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
import { ProductController } from './controller/product-controller';
import { DatabaseModule } from './database/database.module';
import {
  BranchTypeOrmRepository,
  ProductTypeOrmRepository,
  SaleTypeOrmRepository,
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

      uri: process.env.RABBIT_MQ_URI || 'amqp://localhost:5672',
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
      useFactory: (
        branchRepository: BranchTypeOrmRepository,
        saleRepository: SaleTypeOrmRepository,
      ) =>
        new RabbitRegisterFinalCustomerSaleUseCase(
          branchRepository,
          saleRepository,
        ),
      inject: [BranchTypeOrmRepository, SaleTypeOrmRepository],
    },
    {
      provide: RabbitRegisterResellerSaleUseCase,
      useFactory: (
        branchRepository: BranchTypeOrmRepository,
        saleRepository: SaleTypeOrmRepository,
      ) =>
        new RabbitRegisterResellerSaleUseCase(branchRepository, saleRepository),
      inject: [BranchTypeOrmRepository, SaleTypeOrmRepository],
    },
    {
      provide: RabbitRegisterProductUpdateUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RabbitRegisterProductUpdateUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
    },
    {
      provide: GetBranchUseCase,
      useFactory: (branchRepository: BranchTypeOrmRepository) =>
        new GetBranchUseCase(branchRepository),
      inject: [BranchTypeOrmRepository],
    },
    {
      provide: GetSalesUseCase,
      useFactory: (salesRepository: SaleTypeOrmRepository) =>
        new GetSalesUseCase(salesRepository),
      inject: [SaleTypeOrmRepository],
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
        registerProductUpdateUseCase: RabbitRegisterProductUpdateUseCase,
      ) =>
        new MessagingProductHandler(
          registerProductUseCase,
          registerProductInventoryStockUseCase,
          registerFinalCustomerSaleUseCase,
          registerResellerSaleUseCase,
          registerProductUpdateUseCase,
        ),
      inject: [
        RabbitRegisterProductUseCase,
        RabbitRegisterProductInventoryStockUseCase,
        RabbitRegisterFinalCustomerSaleUseCase,
        RabbitRegisterResellerSaleUseCase,
        RabbitRegisterProductUpdateUseCase,
      ],
    },
    {
      provide: MessagingUserHandler,
      useFactory: (registerUserUseCase: RabbitRegisterUserUseCase) =>
        new MessagingUserHandler(registerUserUseCase),
      inject: [RabbitRegisterUserUseCase],
    },
  ],
  controllers: [ProductController],
})
export class InfrastructureModule {}
