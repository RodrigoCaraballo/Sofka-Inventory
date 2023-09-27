import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEventUseCase } from '../commons/application/register-event.use-case';
import { CommonsModule } from '../commons/commons.module';
import { RegisterUserUseCase } from './application/register-user.use-case';
import { IUser } from './domain/interfaces';
import { UserController } from './infrastructure/controller/user.controller';
import { UserTypeOrmEntity } from './infrastructure/database/model/user.typeorm.entity';
import { UserTypeOrmRepository } from './infrastructure/database/repository/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity]), CommonsModule],
  providers: [
    UserTypeOrmRepository,
    {
      provide: RegisterUserUseCase,
      useFactory: (
        userRepository: UserTypeOrmRepository,
        registerEventUseCase: RegisterEventUseCase<IUser>,
      ) => new RegisterUserUseCase(userRepository, registerEventUseCase),
      inject: [UserTypeOrmRepository, RegisterEventUseCase],
    },
  ],
  controllers: [UserController],
  exports: [UserTypeOrmRepository],
})
export class UserModule {}
