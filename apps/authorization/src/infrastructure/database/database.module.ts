import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserMongoose, UserMongooseSchema } from './entity/user.document';
import { UserMongooseRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserMongoose.name, schema: UserMongooseSchema },
    ]),
  ],
  providers: [UserMongooseRepository],
  exports: [UserMongooseRepository],
})
export class DatabaseModule {}
