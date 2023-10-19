import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { IEvent, RegisterSaleData } from '../../../domain';
import { RegisterResellerSaleUseCase } from '../../src/application/register-reseller-sale.use-case';
import { CommandBus, EventMongooseRepository } from '../../src/infrastructure';

describe('Register Reseller Sale Use Case', () => {
  let useCase: RegisterResellerSaleUseCase;
  let repository: EventMongooseRepository;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventMongooseRepository,
          useValue: {
            findProducts: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: RegisterResellerSaleUseCase,
          useFactory: (
            repository: EventMongooseRepository,
            command: CommandBus,
          ) => new RegisterResellerSaleUseCase(repository, command),
          inject: [EventMongooseRepository, CommandBus],
        },
      ],
    }).compile();
    useCase = module.get<RegisterResellerSaleUseCase>(
      RegisterResellerSaleUseCase,
    );
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    test('should return statusCode 200 and success true', async () => {
      const data: RegisterSaleData = {
        branchId: '12',
        invoiceNumber: '123',
        products: [
          {
            id: '124',
            inventoryStock: 2,
          },
        ],
      };

      const mock: IEvent[] = [
        {
          eventAggregateRootId: '12',
          eventType: 'PRODUCT_UPDATED',
          eventData: {
            id: '124',
            name: 'John',
            category: 'others',
            description: 'something',
            inventoryStock: 3,
            price: 12,
          },
          eventPublishedAt: new Date(),
        },
      ];

      const repositorySpy = jest
        .spyOn(repository, 'findProducts')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      expect(await lastValueFrom(result)).toEqual(
        expect.objectContaining({
          statusCode: 200,
          success: true,
        }),
      );
    });

    test('should throw a NotFoundException if products length is 0 or is not defined', async () => {
      const data: RegisterSaleData = {
        branchId: '12',
        invoiceNumber: '123',
        products: [
          {
            id: '124',
            inventoryStock: 2,
          },
        ],
      };

      const mock = undefined;

      const repositorySpy = jest
        .spyOn(repository, 'findProducts')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        NotFoundException,
      );
    });

    test('should throw a BadRequest if products has not enough inventory', async () => {
      const data: RegisterSaleData = {
        branchId: '12',
        invoiceNumber: '123',
        products: [
          {
            id: '124',
            inventoryStock: 2,
          },
        ],
      };

      const mock: IEvent[] = [
        {
          eventAggregateRootId: '12',
          eventType: 'PRODUCT_UPDATED',
          eventData: {
            id: '124',
            name: 'John',
            category: 'others',
            description: 'something',
            inventoryStock: 1,
            price: 12,
          },
          eventPublishedAt: new Date(),
        },
      ];

      const repositorySpy = jest
        .spyOn(repository, 'findProducts')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
