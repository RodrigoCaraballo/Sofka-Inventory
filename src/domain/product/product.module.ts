import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from '../branch/branch.module';
import {
  RegisterFinalCustomerSaleUseCase,
  RegisterProductInventoryStockUseCase,
  RegisterProductUseCase,
  RegisterResellerSaleUseCase,
} from './application';
import { ProductsController } from './infrastructure/controller/branch.controller';
import { ProductTypeOrmEntity, ProductTypeOrmRepository } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTypeOrmEntity]), BranchModule],
  providers: [
    ProductTypeOrmRepository,
    RegisterProductUseCase,
    RegisterProductInventoryStockUseCase,
    RegisterFinalCustomerSaleUseCase,
    RegisterResellerSaleUseCase,
  ],
  controllers: [ProductsController],
})
export class ProductModule {}
