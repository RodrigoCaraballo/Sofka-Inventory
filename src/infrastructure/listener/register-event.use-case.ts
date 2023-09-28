import { IEvent, IEventRepository } from '@Interfaces';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';

type EventCommand = {
  eventType: string;
  eventData: string;
};

@Injectable()
export class RegisterEventListener {
  constructor(private readonly eventRepository: IEventRepository) {}

  @OnEvent('register-event')
  execute(event: EventCommand): void {
    const newEvent: IEvent = {
      eventId: uuidv4(),
      eventType: event.eventType,
      eventData: event.eventData,
      eventPublishedAt: new Date(),
    };

    this.eventRepository.saveEvent(newEvent);
  }
}
