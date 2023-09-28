import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MongooseModule } from '@nestjs/mongoose';
import {
  EventMongoose,
  EventMongooseSchema,
} from './infrastructure/database/model/event.mongoose.document';
import { EventTypeOrmEntity } from './infrastructure/database/model/event.typeorm.entity';
import { EventMongooseRepository } from './infrastructure/database/repository/event.mongoose.repository';
import { RegisterEventListener } from './infrastructure/listener/register-event.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventMongoose.name, schema: EventMongooseSchema },
    ]),
    TypeOrmModule.forFeature([EventTypeOrmEntity]),
  ],
  providers: [
    EventMongooseRepository,
    {
      provide: RegisterEventListener,
      useFactory: (eventRepository: EventMongooseRepository) =>
        new RegisterEventListener(eventRepository),
      inject: [EventMongooseRepository],
    },
  ],
  exports: [],
})
export class CommonsModule {}
