import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BranchTypeOrmEntity,
  EventMongoose,
  EventMongooseSchema,
  ProductTypeOrmEntity,
  UserTypeOrmEntity,
} from './model';
import {
  BranchTypeOrmRepository,
  EventMongooseRepository,
  ProductTypeOrmRepository,
  UserTypeOrmRepository,
} from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EventMongoose.name, schema: EventMongooseSchema },
    ]),
    TypeOrmModule.forFeature([
      BranchTypeOrmEntity,
      ProductTypeOrmEntity,
      UserTypeOrmEntity,
    ]),
  ],
  providers: [
    BranchTypeOrmRepository,
    ProductTypeOrmRepository,
    UserTypeOrmRepository,
    EventMongooseRepository,
  ],
  exports: [
    BranchTypeOrmRepository,
    ProductTypeOrmRepository,
    UserTypeOrmRepository,
    EventMongooseRepository,
  ],
})
export class DatabaseModule {}
