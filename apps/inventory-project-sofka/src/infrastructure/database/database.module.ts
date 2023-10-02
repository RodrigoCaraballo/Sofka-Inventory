import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventMongoose, EventMongooseSchema } from './model';
import { EventMongooseRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventMongoose.name, schema: EventMongooseSchema },
    ]),
  ],
  providers: [EventMongooseRepository],
  exports: [EventMongooseRepository],
})
export class DatabaseModule {}
