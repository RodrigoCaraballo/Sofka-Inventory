import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BranchTypeOrmEntity,
  ProductTypeOrmEntity,
  UserTypeOrmEntity,
} from './model';
import {
  BranchTypeOrmRepository,
  ProductTypeOrmRepository,
  UserTypeOrmRepository,
} from './repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BranchTypeOrmEntity,
      ProductTypeOrmEntity,
      UserTypeOrmEntity,
    ]),
  ],
  providers: [
    BranchTypeOrmRepository,
    ProductTypeOrmRepository,
    UserTypeOrmRepository,
  ],
  exports: [
    BranchTypeOrmRepository,
    ProductTypeOrmRepository,
    UserTypeOrmRepository,
  ],
})
export class DatabaseModule {}
