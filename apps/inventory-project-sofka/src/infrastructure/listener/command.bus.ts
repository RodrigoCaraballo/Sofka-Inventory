import { Command, ICommandBus, IEvent, IEventRepository } from '@Domain';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

export class CommandBus implements ICommandBus {
  private readonly maxRetries = 3; // Número máximo de reintentos
  private readonly retryDelay = 5000; // Retardo entre reintentos en milisegundos

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

    this.clientProxy.emit(command.eventType, newEvent.eventData);

    this.eventRepository.saveEvent(newEvent);
  }
}
