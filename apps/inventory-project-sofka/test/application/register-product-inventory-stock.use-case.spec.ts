import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { IEvent, RegisterProductInventoryStockData } from '../../../domain';
import { RegisterProductInventoryStockUseCase } from '../../src/application/register-product-inventory-stock.use-case';
import { CommandBus, EventMongooseRepository } from '../../src/infrastructure';

describe('Register Product Inventory Stock Use Case', () => {
  let useCase: RegisterProductInventoryStockUseCase;
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
          provide: RegisterProductInventoryStockUseCase,
          useFactory: (
            repository: EventMongooseRepository,
            command: CommandBus,
          ) => new RegisterProductInventoryStockUseCase(repository, command),
          inject: [EventMongooseRepository, CommandBus],
        },
      ],
    }).compile();
    useCase = module.get<RegisterProductInventoryStockUseCase>(
      RegisterProductInventoryStockUseCase,
    );
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    test('should return statusCode 200 and success true', async () => {
      const data: RegisterProductInventoryStockData[] = [
        {
          branchId: '12',
          product: {
            id: '124',
            inventoryStock: 2,
          },
        },
      ];

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

      jest.spyOn(repository, 'findProducts').mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      expect(await lastValueFrom(result)).toEqual(
        expect.objectContaining({
          statusCode: 200,
          success: true,
        }),
      );
    });

    test('should throw a NotFoundException if products length is 0 or is not defined', async () => {
      const data: RegisterProductInventoryStockData[] = [
        {
          branchId: '12',
          product: {
            id: '124',
            inventoryStock: 2,
          },
        },
      ];

      const mock = undefined;

      const repositorySpy = jest
        .spyOn(repository, 'findProducts')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
