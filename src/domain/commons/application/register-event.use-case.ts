import { v4 as uuidv4 } from 'uuid';
import { IEvent } from '../domain/interface/event.interface';
import { IEventRepository } from '../domain/interface/event.interface.repository';

type EventCommand<T> = {
  eventType: string;
  eventData: T;
};

export class RegisterEventUseCase<T> {
  constructor(private readonly eventRepository: IEventRepository) {}

  execute(event: EventCommand<T>): void {
    const newEvent: IEvent = {
      eventId: uuidv4(),
      eventType: event.eventType,
      eventData: JSON.stringify(event.eventData),
      eventPublishedAt: new Date(),
    };

    this.eventRepository.saveEvent(newEvent);
  }
}
