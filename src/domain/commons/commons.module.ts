import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEventUseCase } from './application/register-event.use-case';
import { EventTypeOrmEntity } from './infrastructure/database/model/event.typeorm.entity';
import { EventTypeOrmRepository } from './infrastructure/database/repository/event.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventTypeOrmEntity])],
  providers: [
    EventTypeOrmRepository,
    {
      provide: RegisterEventUseCase,
      useFactory: (eventRepository: EventTypeOrmRepository) =>
        new RegisterEventUseCase(eventRepository),
      inject: [EventTypeOrmRepository],
    },
  ],
  exports: [RegisterEventUseCase],
})
export class CommonsModule {}
