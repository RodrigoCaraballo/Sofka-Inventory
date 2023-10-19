import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { IBranch, RegisterBranchData } from '../../../domain';
import { RegisterBranchUseCase } from '../../src/application/register-branch.use-case';
import { CommandBus, EventMongooseRepository } from '../../src/infrastructure';

describe('Register Branch Use Case', () => {
  let useCase: RegisterBranchUseCase;
  let repository: EventMongooseRepository;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventMongooseRepository,
          useValue: {
            existBranch: jest.fn(),
          },
        },
        {
          provide: CommandBus,
          useValue: {
            publish: jest.fn(),
          },
        },
        {
          provide: RegisterBranchUseCase,
          useFactory: (
            repository: EventMongooseRepository,
            command: CommandBus,
          ) => new RegisterBranchUseCase(repository, command),
          inject: [EventMongooseRepository, CommandBus],
        },
      ],
    }).compile();
    useCase = module.get<RegisterBranchUseCase>(RegisterBranchUseCase);
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('execute', () => {
    test('should return statusCode200 and success true', async () => {
      const data: RegisterBranchData = {
        name: 'foo',
        city: 'bar',
        country: 'bar',
      };

      const mock = undefined;

      const repositorySpy = jest
        .spyOn(repository, 'existBranch')
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
      const data: RegisterBranchData = {
        name: 'foo',
        city: 'bar',
        country: 'bar',
      };

      const mock: IBranch = {
        id: '123',
        name: 'foo',
        city: 'bar',
        country: 'bar',
        employees: [],
        products: [],
      };

      const repositorySpy = jest
        .spyOn(repository, 'existBranch')
        .mockReturnValue(of(mock) as any);

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
