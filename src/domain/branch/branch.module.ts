import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonsModule } from '../commons/commons.module';
import { UserTypeOrmRepository } from '../user/infrastructure/database/repository/user.typeorm.repository';
import { UserModule } from '../user/user.module';
import { RegisterBranchUseCase } from './application/register-branch.use-case';
import { BranchController } from './infrastructure/controller/branch.controller';
import { BranchTypeOrmEntity } from './infrastructure/database/model/branch.typeorm.entity';
import { BranchTypeOrmRepository } from './infrastructure/database/repository/branch.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchTypeOrmEntity]),
    UserModule,
    CommonsModule,
  ],
  providers: [
    BranchTypeOrmRepository,
    {
      provide: RegisterBranchUseCase,
      useFactory: (
        branchRepository: BranchTypeOrmRepository,
        userRepository: UserTypeOrmRepository,
      ) => new RegisterBranchUseCase(branchRepository, userRepository),
      inject: [BranchTypeOrmRepository, UserTypeOrmRepository],
    },
  ],
  controllers: [BranchController],
  exports: [BranchTypeOrmRepository],
})
export class BranchModule {}
