import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUseCase } from './application/auth.use-case';
import { RegisterUserListenerUseCase } from './application/register-user.use-case';
import { AuthController } from './infrastructure/controller/auth.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { UserMongooseRepository } from './infrastructure/database/repository/user.repository';
import { MessagingUserHandler } from './infrastructure/listener/register-user.use-case';
import { UserMongooseSeedService } from './infrastructure/seed/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'BRANCH_EX_1',
          type: 'topic',
        },
      ],
      uri: process.env.RABBIT_MQ_URI || 'amqp://127.0.0.1:5672/',
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: RegisterUserListenerUseCase,
      useFactory: (userRepository: UserMongooseRepository) =>
        new RegisterUserListenerUseCase(userRepository),
      inject: [UserMongooseRepository],
    },
    {
      provide: MessagingUserHandler,
      useFactory: (registerUserUseCase: RegisterUserListenerUseCase) =>
        new MessagingUserHandler(registerUserUseCase),
      inject: [RegisterUserListenerUseCase],
    },
    {
      provide: AuthUseCase,
      useFactory: (userRepository: UserMongooseRepository) =>
        new AuthUseCase(userRepository),
      inject: [UserMongooseRepository],
    },
    {
      provide: UserMongooseSeedService,
      useFactory: (userRepository: UserMongooseRepository) =>
        new UserMongooseSeedService(userRepository),
      inject: [UserMongooseRepository],
    },
  ],
})
export class AuthorizationModule {}
