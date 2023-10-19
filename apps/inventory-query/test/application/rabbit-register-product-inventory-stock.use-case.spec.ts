import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IProduct, RegisterProductInventoryStockData } from '../../../domain';
import { RabbitRegisterProductInventoryStockUseCase } from '../../src/application';
import { ProductTypeOrmRepository } from '../../src/infrastructure';

describe('Rabbit Register Product Use Case', () => {
  let useCase: RabbitRegisterProductInventoryStockUseCase;
  let repositoryProduct: ProductTypeOrmRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductTypeOrmRepository,
          useValue: {
            saveProduct: jest.fn(),
            findProductById: jest.fn(),
          },
        },
        {
          provide: RabbitRegisterProductInventoryStockUseCase,
          useFactory: (repositoryProduct: ProductTypeOrmRepository) =>
            new RabbitRegisterProductInventoryStockUseCase(repositoryProduct),
          inject: [ProductTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<RabbitRegisterProductInventoryStockUseCase>(
      RabbitRegisterProductInventoryStockUseCase,
    );
    repositoryProduct = module.get<ProductTypeOrmRepository>(
      ProductTypeOrmRepository,
    );
  });

  describe('execute', () => {
    test('should return registered branch', async () => {
      const data: RegisterProductInventoryStockData = {
        branchId: '123',
        product: {
          id: '123',
          inventoryStock: 2,
        },
      };

      const mockProduct: IProduct = {
        id: '123',
        name: 'foo',
        category: 'Others',
        description: 'description',
        inventoryStock: 3,
        price: 2,
      };
      const expected: IProduct = {
        id: '123',
        name: 'foo',
        category: 'Others',
        description: 'description',
        inventoryStock: 5,
        price: 2,
      };

      const repositorySpySave = jest
        .spyOn(repositoryProduct, 'findProductById')
        .mockReturnValue(of(mockProduct));
      const repositorySpyProduct = jest
        .spyOn(repositoryProduct, 'saveProduct')
        .mockReturnValue(of(mockProduct));

      const result = useCase.execute(data);

      expect(repositorySpySave).toHaveBeenCalled();
      //   expect(repositorySpyProduct).toHaveBeenCalled();

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error on find', async () => {
      const data: RegisterProductInventoryStockData = {
        branchId: '123',
        product: {
          id: '123',
          inventoryStock: 2,
        },
      };

      const mockBranch = new InternalServerErrorException(
        'Something went wrong',
      );

      const repositorySpyBranch = jest
        .spyOn(repositoryProduct, 'findProductById')
        .mockReturnValue(throwError(mockBranch));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });

    test('should return an error on save', async () => {
      const data: RegisterProductInventoryStockData = {
        branchId: '123',
        product: {
          id: '123',
          inventoryStock: 2,
        },
      };

      const mockProduct: IProduct = {
        id: '123',
        name: 'foo',
        category: 'Others',
        description: 'description',
        inventoryStock: 2,
        price: 2,
      };

      const mockProductEx = new InternalServerErrorException(
        'Something went wrong',
      );

      const repositorySpyBranch = jest
        .spyOn(repositoryProduct, 'findProductById')
        .mockReturnValue(of(mockProduct));
      const repositorySpyProduct = jest
        .spyOn(repositoryProduct, 'saveProduct')
        .mockReturnValue(throwError(mockProductEx));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();
      //   expect(repositorySpyProduct).toHaveBeenCalled();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
