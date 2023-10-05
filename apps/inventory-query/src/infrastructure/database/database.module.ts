import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BranchTypeOrmEntity,
  ProductTypeOrmEntity,
  SaleTypeOrmEntity,
  UserTypeOrmEntity,
} from './model';
import {
  BranchTypeOrmRepository,
  ProductTypeOrmRepository,
  SaleTypeOrmRepository,
  UserTypeOrmRepository,
} from './repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BranchTypeOrmEntity,
      ProductTypeOrmEntity,
      UserTypeOrmEntity,
      SaleTypeOrmEntity,
    ]),
  ],
  providers: [
    BranchTypeOrmRepository,
    ProductTypeOrmRepository,
    UserTypeOrmRepository,
    SaleTypeOrmRepository,
  ],
  exports: [
    BranchTypeOrmRepository,
    ProductTypeOrmRepository,
    UserTypeOrmRepository,
    SaleTypeOrmRepository,
  ],
})
export class DatabaseModule {}
