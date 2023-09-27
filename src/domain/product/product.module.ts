import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from '../branch/branch.module';
import { BranchTypeOrmRepository } from '../branch/infrastructure/database/repository/branch.repository';
import { CommonsModule } from '../commons/commons.module';
import {
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
} from './application';
import { ProductTypeOrmEntity } from './domain';
import { ProductsController } from './infrastructure/controller/branch.controller';
import { ProductTypeOrmRepository } from './infrastructure/database/repository/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypeOrmEntity]),
    BranchModule,
    CommonsModule,
  ],
  providers: [
    ProductTypeOrmRepository,
    {
      provide: RegisterProductUseCase,
      useFactory: (
        branchRepository: BranchTypeOrmRepository,
        productRepository: ProductTypeOrmRepository,
      ) => new RegisterProductUseCase(branchRepository, productRepository),
      inject: [BranchTypeOrmRepository, ProductTypeOrmRepository],
    },
    {
      provide: RegisterProductInventoryStockUseCase,
      useFactory: (productRepository: ProductTypeOrmRepository) =>
        new RegisterProductInventoryStockUseCase(productRepository),
      inject: [ProductTypeOrmRepository],
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
  ],
  controllers: [ProductsController],
})
export class ProductModule {}
