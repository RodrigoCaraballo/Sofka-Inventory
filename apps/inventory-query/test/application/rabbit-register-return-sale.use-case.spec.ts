import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { ISale, RegisterReturnSaleData } from '../../../domain';
import { RabbitRegisterReturnSaleUseCase } from '../../../inventory-query/src/application/rabbit-register-return-sale.use-case';
import { SaleTypeOrmRepository } from '../../src/infrastructure';

describe('Get Branch Use Case', () => {
  let useCase: RabbitRegisterReturnSaleUseCase;
  let repository: SaleTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SaleTypeOrmRepository,
          useValue: {
            findSaleByInvoiceNumberAndProductId: jest.fn(),
            saveSale: jest.fn(),
          },
        },
        {
          provide: RabbitRegisterReturnSaleUseCase,
          useFactory: (repository: SaleTypeOrmRepository) =>
            new RabbitRegisterReturnSaleUseCase(repository),
          inject: [SaleTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<RabbitRegisterReturnSaleUseCase>(
      RabbitRegisterReturnSaleUseCase,
    );
    repository = module.get<SaleTypeOrmRepository>(SaleTypeOrmRepository);
  });

  describe('execute', () => {
    test('should return statusCode200 and success true', async () => {
      const data: RegisterReturnSaleData = {
        branchId: '123',
        inventoryStock: 2,
        invoiceNumber: '1234',
        productId: '123',
        saleId: '123',
      };

      const mock: ISale = {
        id: '123',
        invoiceNumber: '123',
        productName: 'Product Name',
        productPrice: 2,
        quantity: 1,
        activated: true,
        type: 'RESELLER',
      };
      const expected: ISale = {
        id: '123',
        invoiceNumber: '123',
        productName: 'Product Name',
        productPrice: 2,
        quantity: 1,
        activated: false,
        type: 'RESELLER',
      };

      const repositorySpy = jest
        .spyOn(repository, 'findSaleByInvoiceNumberAndProductId')
        .mockReturnValue(of(mock));
      const repositorySpySave = jest
        .spyOn(repository, 'saveSale')
        .mockReturnValue(of(expected));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(
        data.invoiceNumber,
        data.saleId,
      );

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should throw bad request exception if user is undefined', async () => {
      const data: RegisterReturnSaleData = {
        branchId: '123',
        inventoryStock: 2,
        invoiceNumber: '1234',
        productId: '123',
        saleId: '123',
      };

      const mock = new InternalServerErrorException('Something went wrong');

      const repositorySpy = jest
        .spyOn(repository, 'findSaleByInvoiceNumberAndProductId')
        .mockReturnValue(throwError(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(
        data.invoiceNumber,
        data.saleId,
      );

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
