import { RegisterUserUseCase } from '@CommandApplication';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { IProduct, RegisterUserData } from '../../../domain';
import { CommandBus, EventMongooseRepository } from '../../src/infrastructure';

describe('Register User Use Case', () => {
  let useCase: RegisterUserUseCase;
  let repository: EventMongooseRepository;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventMongooseRepository,
          useValue: {
            existUser: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: RegisterUserUseCase,
          useFactory: (
            repository: EventMongooseRepository,
            command: CommandBus,
          ) => new RegisterUserUseCase(repository, command),
          inject: [EventMongooseRepository, CommandBus],
        },
      ],
    }).compile();
    useCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    test('should return statusCode200 and success true', async () => {
      const data: RegisterUserData = {
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'Rodrigo1234',
        role: 'admin',
        branchId: '123',
      };

      const mock = undefined;

      const repositorySpy = jest
        .spyOn(repository, 'existUser')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data.email);

      expect(await lastValueFrom(result)).toEqual(
        expect.objectContaining({
          statusCode: 200,
          success: true,
        }),
      );
    });

    test('should throw bad request exception if user isnt undefined', async () => {
      const data: RegisterUserData = {
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'Rodrigo1234',
        role: 'admin',
        branchId: '123',
      };

      const mock: IProduct = {
        id: '123',
        name: 'foo',
        category: 'others',
        description: 'description',
        price: 1,
      };

      const repositorySpy = jest
        .spyOn(repository, 'existUser')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data.email);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
