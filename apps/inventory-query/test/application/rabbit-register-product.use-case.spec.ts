import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IBranch, IProduct, RegisterProductData } from '../../../domain';
import { RabbitRegisterProductUseCase } from '../../src/application';
import {
  BranchTypeOrmRepository,
  ProductTypeOrmRepository,
} from '../../src/infrastructure';

describe('Rabbit Register Product Use Case', () => {
  let useCase: RabbitRegisterProductUseCase;
  let repositoryBranch: BranchTypeOrmRepository;
  let repositoryProduct: ProductTypeOrmRepository;

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
          provide: ProductTypeOrmRepository,
          useValue: {
            saveProduct: jest.fn(),
          },
        },
        {
          provide: RabbitRegisterProductUseCase,
          useFactory: (
            repositoryProduct: ProductTypeOrmRepository,
            repositoryBranch: BranchTypeOrmRepository,
          ) =>
            new RabbitRegisterProductUseCase(
              repositoryProduct,
              repositoryBranch,
            ),
          inject: [ProductTypeOrmRepository, BranchTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<RabbitRegisterProductUseCase>(
      RabbitRegisterProductUseCase,
    );
    repositoryBranch = module.get<BranchTypeOrmRepository>(
      BranchTypeOrmRepository,
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
        price: 2,
      };

      const mockBranch: IBranch = {
        id: '123',
        name: 'foo',
        city: 'bar',
        country: 'bar',
        employees: [],
        products: [],
      };

      const mockProduct: IProduct = {
        id: '123',
        name: 'foo',
        category: 'Others',
        description: 'description',
        price: 2,
      };

      const repositorySpyBranch = jest
        .spyOn(repositoryBranch, 'findBranchById')
        .mockReturnValue(of(mockBranch));
      const repositorySpyProduct = jest
        .spyOn(repositoryProduct, 'saveProduct')
        .mockReturnValue(of(mockProduct));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();
      //   expect(repositorySpyProduct).toHaveBeenCalled();

      expect(await lastValueFrom(result)).toEqual(mockProduct);
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
        .spyOn(repositoryBranch, 'findBranchById')
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

      const mockBranch: IBranch = {
        id: '123',
        name: 'foo',
        city: 'bar',
        country: 'bar',
        employees: [],
        products: [],
      };

      const mockProduct = new InternalServerErrorException(
        'Something went wrong',
      );

      const repositorySpyBranch = jest
        .spyOn(repositoryBranch, 'findBranchById')
        .mockReturnValue(of(mockBranch));
      const repositorySpyProduct = jest
        .spyOn(repositoryProduct, 'saveProduct')
        .mockReturnValue(throwError(mockProduct));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();
      //   expect(repositorySpyProduct).toHaveBeenCalled();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
