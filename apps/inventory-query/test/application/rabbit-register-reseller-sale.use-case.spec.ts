import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IBranch, ISale, RegisterSalesData } from '../../../domain';
import { RabbitRegisterResellerSaleUseCase } from '../../src/application';
import {
  BranchTypeOrmRepository,
  SaleTypeOrmRepository,
} from '../../src/infrastructure';

describe('Rabbit Reseller Sale Use Case', () => {
  let useCase: RabbitRegisterResellerSaleUseCase;
  let repositoryBranch: BranchTypeOrmRepository;
  let repositorySale: SaleTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: BranchTypeOrmRepository,
          useValue: {
            findBranchById: jest.fn(),
          },
        },
        {
          provide: SaleTypeOrmRepository,
          useValue: {
            saveSales: jest.fn(),
          },
        },
        {
          provide: RabbitRegisterResellerSaleUseCase,
          useFactory: (
            repositoryBranch: BranchTypeOrmRepository,
            repositorySale: SaleTypeOrmRepository,
          ) =>
            new RabbitRegisterResellerSaleUseCase(
              repositoryBranch,
              repositorySale,
            ),
          inject: [BranchTypeOrmRepository, SaleTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<RabbitRegisterResellerSaleUseCase>(
      RabbitRegisterResellerSaleUseCase,
    );
    repositoryBranch = module.get<BranchTypeOrmRepository>(
      BranchTypeOrmRepository,
    );
    repositorySale = module.get<SaleTypeOrmRepository>(SaleTypeOrmRepository);
  });

  describe('execute', () => {
    test('should return registered final customer sale', async () => {
      const data: RegisterSalesData[] = [
        {
          invoiceNumber: '1234',
          productName: 'foo',
          productPrice: 3,
          quantity: 2,
          type: 'RESELLER',
          branchId: '1234',
        },
      ];

      const mockBranch: IBranch = {
        id: '123',
        name: 'foo',
        city: 'bar',
        country: 'bar',
        employees: [],
        products: [],
      };

      const mockSale: ISale[] = [
        {
          invoiceNumber: '1234',
          productName: 'foo',
          productPrice: 3,
          quantity: 2,
          activated: true,
          type: 'RESELLER',
        },
      ];

      const repositorySpyBranch = jest
        .spyOn(repositoryBranch, 'findBranchById')
        .mockReturnValue(of(mockBranch));

      const repositorySpySale = jest
        .spyOn(repositorySale, 'saveSales')
        .mockReturnValue(of(mockSale));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();
      //   expect(repositorySpySale).toHaveBeenCalled();

      expect(await lastValueFrom(result)).toEqual(mockSale);
    });

    test('should return an error on save', async () => {
      const data: RegisterSalesData[] = [
        {
          invoiceNumber: '1234',
          productName: 'foo',
          productPrice: 3,
          quantity: 2,
          type: 'RESELLER',
          branchId: '1234',
        },
      ];

      const mockBranch: IBranch = {
        id: '123',
        name: 'foo',
        city: 'bar',
        country: 'bar',
        employees: [],
        products: [],
      };

      const mockSave = new InternalServerErrorException('Something went wrong');

      const repositorySpyBranch = jest
        .spyOn(repositoryBranch, 'findBranchById')
        .mockReturnValue(of(mockBranch));

      const repositorySpySale = jest
        .spyOn(repositorySale, 'saveSales')
        .mockReturnValue(throwError(mockSave));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });

    test('should return an error on find', async () => {
      const data: RegisterSalesData[] = [
        {
          invoiceNumber: '1234',
          productName: 'foo',
          productPrice: 3,
          quantity: 2,
          type: 'RESELLER',
          branchId: '1234',
        },
      ];

      const mockBranch = new InternalServerErrorException(
        'Something went wrong',
      );

      const repositorySpyBranch = jest
        .spyOn(repositoryBranch, 'findBranchById')
        .mockReturnValue(throwError(mockBranch));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
