import { Command } from '@Command';
import { IEvent, IEventRepository } from '@Interfaces';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';

type EventCommand = {
  eventAggregateRootId: string;
  eventType: string;
  eventData: string;
};

@CommandHandler(Command)
export class RegisterEventListener implements ICommandHandler<Command> {
  constructor(private readonly eventRepository: IEventRepository) {}
  execute(command: Command): any {
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
