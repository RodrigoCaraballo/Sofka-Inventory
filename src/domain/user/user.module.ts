import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { UserController } from './infrastructure/controller/user.controller';
import { UserTypeOrmRepository } from './model/repository/user.typeorm.repository';
import { UserTypeOrmEntity } from './model/user.typeorm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  providers: [UserTypeOrmRepository, RegisterUserUseCase],
  controllers: [UserController],
  exports: [UserTypeOrmRepository],
})
export class UserModule {}
