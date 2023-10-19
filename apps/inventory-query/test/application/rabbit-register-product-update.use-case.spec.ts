import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IProduct, RegisterProductData } from '../../../domain';
import { RabbitRegisterProductUpdateUseCase } from '../../src/application';
import { ProductTypeOrmRepository } from '../../src/infrastructure';

describe('Rabbit Register Product Update Use Case', () => {
  let useCase: RabbitRegisterProductUpdateUseCase;
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
          provide: RabbitRegisterProductUpdateUseCase,
          useFactory: (repositoryProduct: ProductTypeOrmRepository) =>
            new RabbitRegisterProductUpdateUseCase(repositoryProduct),
          inject: [ProductTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<RabbitRegisterProductUpdateUseCase>(
      RabbitRegisterProductUpdateUseCase,
    );
    repositoryProduct = module.get<ProductTypeOrmRepository>(
      ProductTypeOrmRepository,
    );
  });

  describe('execute', () => {
    test('should return registered branch', async () => {
      const data: RegisterProductData = {
        name: 'foo',
        branchId: '1234',
        category: 'Others',
        description: 'description',
        inventoryStock: 3,
        price: 2,
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
        inventoryStock: 3,
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
      const data: RegisterProductData = {
        name: 'foo',
        branchId: '1234',
        category: 'Others',
        description: 'description',
        price: 2,
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
      const data: RegisterProductData = {
        name: 'foo',
        branchId: '1234',
        category: 'Others',
        description: 'description',
        price: 2,
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
