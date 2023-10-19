import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IBranch } from '../../../domain';
import { GetBranchesUseCase } from '../../src/application';
import { BranchTypeOrmRepository } from '../../src/infrastructure';

describe('Get Branches Use Case', () => {
  let useCase: GetBranchesUseCase;
  let repository: BranchTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BranchTypeOrmRepository,
          useValue: {
            findAllBranches: jest.fn(),
          },
        },
        {
          provide: GetBranchesUseCase,
          useFactory: (repository: BranchTypeOrmRepository) =>
            new GetBranchesUseCase(repository),
          inject: [BranchTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<GetBranchesUseCase>(GetBranchesUseCase);
    repository = module.get<BranchTypeOrmRepository>(BranchTypeOrmRepository);
  });

  describe('execute', () => {
    test('should return statusCode200 and success true', async () => {
      const mock: IBranch[] = [
        {
          id: '123',
          name: 'foo',
          city: 'bar',
          country: 'bar',
          employees: [],
          products: [],
        },
      ];

      const repositorySpy = jest
        .spyOn(repository, 'findAllBranches')
        .mockReturnValue(of(mock));

      const result = useCase.execute();

      expect(repositorySpy).toHaveBeenCalled();

      expect(await lastValueFrom(result)).toEqual(mock);
    });

    test('should throw bad request exception if user is undefined', async () => {
      const mock = new InternalServerErrorException('Something went wrong');

      const repositorySpy = jest
        .spyOn(repository, 'findAllBranches')
        .mockReturnValue(throwError(mock));

      const result = useCase.execute();

      expect(repositorySpy).toHaveBeenCalled();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
