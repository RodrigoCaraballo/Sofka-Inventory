import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonsModule } from '../commons/commons.module';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { UserController } from './infrastructure/controller/user.controller';
import { UserTypeOrmEntity } from './infrastructure/database/model/user.typeorm.entity';
import { UserTypeOrmRepository } from './infrastructure/database/repository/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity]), CommonsModule],
  providers: [
    UserTypeOrmRepository,
    {
      provide: RegisterUserUseCase,
      useFactory: (userRepository: UserTypeOrmRepository) =>
        new RegisterUserUseCase(userRepository),
      inject: [UserTypeOrmRepository],
    },
  ],
  controllers: [UserController],
  exports: [UserTypeOrmRepository],
})
export class UserModule {}
