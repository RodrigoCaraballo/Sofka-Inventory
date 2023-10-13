import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../../../../domain/interfaces';

export type UserMongooseDocument = HydratedDocument<UserMongoose>;

@Schema()
export class UserMongoose implements IUser {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  role: string;

  @Prop()
  branchId: string;
}

export const UserMongooseSchema = SchemaFactory.createForClass(UserMongoose);
