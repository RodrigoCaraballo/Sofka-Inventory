import { IEvent, IEventRepository } from '@Domain';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventMongoose } from '../model/event.mongoose.document';

export class EventMongooseRepository implements IEventRepository {
  constructor(
    @InjectModel(EventMongoose.name)
    private readonly eventRepository: Model<EventMongoose>,
  ) {}
  saveEvent(event: IEvent): void {
    this.eventRepository.create(event);
  }
}
