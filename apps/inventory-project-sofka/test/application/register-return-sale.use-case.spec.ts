import { RegisterReturnSaleUseCase } from '@CommandApplication';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { IEvent, RegisterReturnSaleData } from '../../../domain';
import { CommandBus, EventMongooseRepository } from '../../src/infrastructure';

describe('Register Return Sale Use Case', () => {
  let useCase: RegisterReturnSaleUseCase;
  let repository: EventMongooseRepository;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventMongooseRepository,
          useValue: {
            findProduct: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: RegisterReturnSaleUseCase,
          useFactory: (
            repository: EventMongooseRepository,
            command: CommandBus,
          ) => new RegisterReturnSaleUseCase(repository, command),
          inject: [EventMongooseRepository, CommandBus],
        },
      ],
    }).compile();
    useCase = module.get<RegisterReturnSaleUseCase>(RegisterReturnSaleUseCase);
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    test('should return statusCode200 and success true', async () => {
      const data: RegisterReturnSaleData = {
        branchId: '123',
        inventoryStock: 1,
        invoiceNumber: '1234',
        productId: '1235',
        saleId: '123456',
      };

      const mock: IEvent = {
        eventAggregateRootId: '123',
        eventType: 'PRODUCT_UPDATED',
        eventData: {
          id: '1235',
          name: 'foo',
          category: 'others',
          description: 'description',
          inventoryStock: 2,
          price: 1,
        },
        eventPublishedAt: new Date(),
      };

      const repositorySpy = jest
        .spyOn(repository, 'findProduct')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data.branchId, data.productId);

      expect(await lastValueFrom(result)).toEqual(
        expect.objectContaining({
          statusCode: 200,
          success: true,
        }),
      );
    });

    test('should throw bad request exception if user isnt undefined', async () => {
      const data: RegisterReturnSaleData = {
        branchId: '123',
        inventoryStock: 1,
        invoiceNumber: '1234',
        productId: '1235',
        saleId: '123456',
      };

      const mock = undefined;

      const repositorySpy = jest
        .spyOn(repository, 'findProduct')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data.branchId, data.productId);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
