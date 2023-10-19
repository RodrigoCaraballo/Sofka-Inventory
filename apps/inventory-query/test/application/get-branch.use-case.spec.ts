import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IBranch } from '../../../domain';
import { GetBranchUseCase } from '../../src/application';
import { BranchTypeOrmRepository } from '../../src/infrastructure';

describe('Get Branch Use Case', () => {
  let useCase: GetBranchUseCase;
  let repository: BranchTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BranchTypeOrmRepository,
          useValue: {
            findBranchByIdWithRelations: jest.fn(),
          },
        },
        {
          provide: GetBranchUseCase,
          useFactory: (repository: BranchTypeOrmRepository) =>
            new GetBranchUseCase(repository),
          inject: [BranchTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<GetBranchUseCase>(GetBranchUseCase);
    repository = module.get<BranchTypeOrmRepository>(BranchTypeOrmRepository);
  });

  describe('execute', () => {
    test('should return statusCode200 and success true', async () => {
      const data = '123';

      const mock: IBranch = {
        id: '123',
        name: 'foo',
        city: 'bar',
        country: 'bar',
        employees: [],
        products: [],
      };

      const repositorySpy = jest
        .spyOn(repository, 'findBranchByIdWithRelations')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data);

      expect(await lastValueFrom(result)).toEqual(mock);
    });

    test('should throw bad request exception if user is undefined', async () => {
      const data = '123';

      const mock = new InternalServerErrorException('Something went wrong');

      const repositorySpy = jest
        .spyOn(repository, 'findBranchByIdWithRelations')
        .mockReturnValue(throwError(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
