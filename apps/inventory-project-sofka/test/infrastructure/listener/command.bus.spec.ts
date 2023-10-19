import { Command } from '@Domain';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Test, TestingModule } from '@nestjs/testing';
import { EventMongooseRepository } from '../../../src/infrastructure/database';
import { CommandBus } from '../../../src/infrastructure/listener';

describe('Command Bus', () => {
  let commandBus: CommandBus;
  let repository: EventMongooseRepository;
  let amqpConnection: AmqpConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventMongooseRepository,
          useValue: {
            saveEvent: jest.fn(),
          },
        },
        {
          provide: AmqpConnection,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useFactory: (
            eventRepository: EventMongooseRepository,
            amqpConnection: AmqpConnection,
          ) => new CommandBus(eventRepository, amqpConnection),
          inject: [EventMongooseRepository, AmqpConnection],
        },
      ],
    }).compile();
    commandBus = module.get<CommandBus>(CommandBus);
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  describe('publish', () => {
    test('should emit and save and event', () => {
      const data: Command = {
        eventAggregateRootId: '2',
        eventData: '{"id":"3"}',
        eventType: 'GENERIC',
      };

      const amqpSpy = jest.spyOn(amqpConnection, 'publish');
      const repositorySpy = jest.spyOn(repository, 'saveEvent');

      commandBus.publish(data);

      expect(amqpSpy).toHaveBeenCalledWith(
        'BRANCH_EX_1',
        'GENERIC',
        '{"id":"3"}',
      );
      expect(repositorySpy).toHaveBeenCalledWith({
        eventId: expect.any(String),
        eventAggregateRootId: '2',
        eventType: 'GENERIC',
        eventData: { id: '3' },
        eventPublishedAt: expect.any(Date),
      });
    });
  });
});
