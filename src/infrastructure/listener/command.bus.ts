import { Command } from '@Command';
import { ICommandBus, IEvent, IEventRepository } from '@Interfaces';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

export class CommandBus implements ICommandBus {
  constructor(
    private readonly eventRepository: IEventRepository,
    @Inject('BRANCH_RMQ') private readonly clientProxy: ClientProxy,
  ) {}
  publish(command: Command): void {
    const newEvent: IEvent = {
      eventId: uuidv4(),
      eventAggregateRootId: command.eventAggregateRootId,
      eventType: command.eventType,
      eventData: command.eventData,
      eventPublishedAt: new Date(),
    };

    this.clientProxy.emit(command.eventType, JSON.stringify(newEvent));

    this.eventRepository.saveEvent(newEvent);
  }
}
