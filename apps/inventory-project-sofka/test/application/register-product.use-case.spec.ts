import { RegisterProductUseCase } from '@CommandApplication';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { IProduct, RegisterProductData } from '../../../domain';
import { CommandBus, EventMongooseRepository } from '../../src/infrastructure';

describe('Register Product Use Case', () => {
  let useCase: RegisterProductUseCase;
  let repository: EventMongooseRepository;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventMongooseRepository,
          useValue: {
            existProduct: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: RegisterProductUseCase,
          useFactory: (
            repository: EventMongooseRepository,
            command: CommandBus,
          ) => new RegisterProductUseCase(repository, command),
          inject: [EventMongooseRepository, CommandBus],
        },
      ],
    }).compile();
    useCase = module.get<RegisterProductUseCase>(RegisterProductUseCase);
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    test('should return statusCode200 and success true', async () => {
      const data: RegisterProductData = {
        name: 'foo',
        branchId: '123',
        category: 'others',
        description: 'description',
        price: 1,
      };

      const mock = undefined;

      const repositorySpy = jest
        .spyOn(repository, 'existProduct')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data);

      expect(await lastValueFrom(result)).toEqual(
        expect.objectContaining({
          statusCode: 200,
          success: true,
        }),
      );
    });

    test('should throw bad request exception if user is undefined', async () => {
      const data: RegisterProductData = {
        name: 'foo',
        branchId: '123',
        category: 'others',
        description: 'description',
        price: 1,
      };

      const mock: IProduct = {
        id: '123',
        name: 'foo',
        category: 'others',
        description: 'description',
        price: 1,
      };

      const repositorySpy = jest
        .spyOn(repository, 'existProduct')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
