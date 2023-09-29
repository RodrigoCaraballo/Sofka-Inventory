import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventMongooseDocuement = HydratedDocument<EventMongoose>;

@Schema()
export class EventMongoose {
  @Prop()
  eventType: string;

  @Prop()
  eventAggregateRootId: string;

  @Prop()
  eventData: string;

  @Prop()
  eventPublishedAt: Date;
}

export const EventMongooseSchema = SchemaFactory.createForClass(EventMongoose);
