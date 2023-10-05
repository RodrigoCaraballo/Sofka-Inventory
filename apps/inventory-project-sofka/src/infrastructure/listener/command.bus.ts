import { Command, ICommandBus, IEvent, IEventRepository } from '@Domain';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { v4 as uuidv4 } from 'uuid';

export class CommandBus implements ICommandBus {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly amqpConnection: AmqpConnection,
  ) {}
  publish(command: Command): void {
    const newEvent: IEvent = {
      eventId: uuidv4(),
      eventAggregateRootId: command.eventAggregateRootId,
      eventType: command.eventType,
      eventData: JSON.parse(command.eventData),
      eventPublishedAt: new Date(),
    };

    this.amqpConnection.publish(
      'BRANCH_EX_1',
      newEvent.eventType,
      command.eventData,
    );

    this.eventRepository.saveEvent(newEvent);
  }
}
