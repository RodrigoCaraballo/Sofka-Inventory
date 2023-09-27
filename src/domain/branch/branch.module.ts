import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { RegisterBranchUseCase } from './application/register-branch.use-case';
import { BranchController } from './infrastructure/controller/branch.controller';
import { BranchTypeOrmEntity } from './model/branch.typeorm.entity';
import { BranchTypeOrmRepository } from './model/repository';

@Module({
  imports: [TypeOrmModule.forFeature([BranchTypeOrmEntity]), UserModule],
  providers: [BranchTypeOrmRepository, RegisterBranchUseCase],
  controllers: [BranchController],
  exports: [BranchTypeOrmRepository],
})
export class BranchModule {}
