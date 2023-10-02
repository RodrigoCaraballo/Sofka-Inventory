import { Command } from '@Command';
import { ICommandBus, IEvent, IEventRepository } from '@Interfaces';
import { v4 as uuidv4 } from 'uuid';

export class CommandBus implements ICommandBus {
  constructor(private readonly eventRepository: IEventRepository) {}
  publish(command: Command): void {
    const newEvent: IEvent = {
      eventId: uuidv4(),
      eventAggregateRootId: command.eventAggregateRootId,
      eventType: command.eventType,
      eventData: command.eventData,
      eventPublishedAt: new Date(),
    };

    this.eventRepository.saveEvent(newEvent);
  }
}
