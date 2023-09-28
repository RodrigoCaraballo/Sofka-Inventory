import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';
import { IEvent } from '../../domain/interface/event.interface';
import { IEventRepository } from '../../domain/interface/event.interface.repository';

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
