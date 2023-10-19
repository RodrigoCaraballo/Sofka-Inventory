import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IBranch, RegisterBranchData } from '../../../domain';
import { RabbitRegisterBranchUseCase } from '../../src/application';
import { BranchTypeOrmRepository } from '../../src/infrastructure';

describe('Rabbit Register Branch Use Case', () => {
  let useCase: RabbitRegisterBranchUseCase;
  let repository: BranchTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BranchTypeOrmRepository,
          useValue: {
            saveBranch: jest.fn(),
          },
        },
        {
          provide: RabbitRegisterBranchUseCase,
          useFactory: (repository: BranchTypeOrmRepository) =>
            new RabbitRegisterBranchUseCase(repository),
          inject: [BranchTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<RabbitRegisterBranchUseCase>(
      RabbitRegisterBranchUseCase,
    );
    repository = module.get<BranchTypeOrmRepository>(BranchTypeOrmRepository);
  });

  describe('execute', () => {
    test('should return registered branch', async () => {
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
        .spyOn(repository, 'saveBranch')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalled();

      expect(await lastValueFrom(result)).toEqual(mock);
    });

    test('should throw internal error', async () => {
      const data: RegisterBranchData = {
        name: 'foo',
        city: 'bar',
        country: 'bar',
      };

      const mock = new InternalServerErrorException('Something went wrong');

      const repositorySpy = jest
        .spyOn(repository, 'saveBranch')
        .mockReturnValue(throwError(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalled();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
