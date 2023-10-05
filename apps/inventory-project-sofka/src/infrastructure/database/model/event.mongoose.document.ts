import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IEvent } from '../../../../../domain/interfaces';

export type EventMongooseDocument = HydratedDocument<EventMongoose>;

@Schema()
export class EventMongoose implements IEvent {
  @Prop()
  eventType: string;

  @Prop()
  eventAggregateRootId: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  eventData: Record<string, any>;

  @Prop()
  eventPublishedAt: Date;
}

export const EventMongooseSchema = SchemaFactory.createForClass(EventMongoose);
