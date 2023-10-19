import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { ISale } from '../../../domain';
import { GetSalesUseCase } from '../../src/application';
import { SaleTypeOrmRepository } from '../../src/infrastructure';

describe('Get Sales Use Case', () => {
  let useCase: GetSalesUseCase;
  let repository: SaleTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SaleTypeOrmRepository,
          useValue: {
            findSales: jest.fn(),
          },
        },
        {
          provide: GetSalesUseCase,
          useFactory: (repository: SaleTypeOrmRepository) =>
            new GetSalesUseCase(repository),
          inject: [SaleTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<GetSalesUseCase>(GetSalesUseCase);
    repository = module.get<SaleTypeOrmRepository>(SaleTypeOrmRepository);
  });

  describe('execute', () => {
    test('should return sales', async () => {
      const branchId = '124';

      const mock: ISale[] = [
        {
          id: '123',
          invoiceNumber: '123',
          productName: 'Product',
          productPrice: 3,
          quantity: 2,
          activated: true,
          type: 'RESELLER',
        },
      ];

      const repositorySpy = jest
        .spyOn(repository, 'findSales')
        .mockReturnValue(of(mock));

      const result = useCase.execute(branchId);

      expect(repositorySpy).toHaveBeenCalledWith(branchId);

      expect(await lastValueFrom(result)).toEqual(mock);
    });

    test('should throw internal server error', async () => {
      const branchId = '124';

      const mock = new InternalServerErrorException('Something went wrong');

      const repositorySpy = jest
        .spyOn(repository, 'findSales')
        .mockReturnValue(throwError(mock));

      const result = useCase.execute(branchId);

      expect(repositorySpy).toHaveBeenCalledWith(branchId);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
