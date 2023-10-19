import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { lastValueFrom, of } from 'rxjs';
import { Repository } from 'typeorm';
import {
  ProductTypeOrmEntity,
  ProductTypeOrmRepository,
} from '../../../../src/infrastructure/database';

describe('Product TypeOrm Repository', () => {
  let repository: ProductTypeOrmRepository;
  let model: Repository<ProductTypeOrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductTypeOrmRepository,
        {
          provide: getRepositoryToken(ProductTypeOrmEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<ProductTypeOrmRepository>(ProductTypeOrmRepository);
    model = module.get<Repository<ProductTypeOrmEntity>>(
      getRepositoryToken(ProductTypeOrmEntity),
    );
  });

  describe('saveProduct', () => {
    test('Should return the saved product', async () => {
      const data = {
        name: 'foo',
        description: 'foo',
        price: 2,
        inventoryStock: 0,
        category: 'Others',
      };

      const expected = {
        ...data,
        id: '123',
      };

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveProduct(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = {
        name: 'foo',
        description: 'foo',
        price: 2,
        inventoryStock: 0,
        category: 'Others',
      };

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'save').mockRejectedValue(of(mock) as any);

      const result = repository.saveProduct(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('saveProducts', () => {
    test('Should return saved products', async () => {
      const data = [
        {
          name: 'foo',
          description: 'foo',
          price: 2,
          inventoryStock: 0,
          category: 'Others',
        },
        {
          name: 'foo',
          description: 'foo',
          price: 2,
          inventoryStock: 0,
          category: 'Others',
        },
      ];

      const expected = data.map((d, index) => ({ ...d, id: index.toString() }));

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveProducts(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = [
        {
          name: 'foo',
          description: 'foo',
          price: 2,
          inventoryStock: 0,
          category: 'Others',
        },
        {
          name: 'foo',
          description: 'foo',
          price: 2,
          inventoryStock: 0,
          category: 'Others',
        },
      ];

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'save').mockRejectedValue(of(mock) as any);

      const result = repository.saveProducts(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findProductById', () => {
    test('Should return a product', async () => {
      const data = '124';

      const expected = {
        name: 'foo',
        description: 'foo',
        price: 2,
        inventoryStock: 0,
        category: 'Others',
        id: '124',
      };

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findProductById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an undefined', async () => {
      const data = '124';

      const expected = undefined;

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findProductById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = '124';

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'findOne').mockRejectedValue(of(mock) as any);

      const result = repository.findProductById(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findProductsById', () => {
    test('Should return a product', async () => {
      const data = ['124', '123'];

      const expected = [
        {
          name: 'foo',
          description: 'foo',
          price: 2,
          inventoryStock: 0,
          category: 'Others',
          id: '123',
        },
        {
          name: 'foo',
          description: 'foo',
          price: 2,
          inventoryStock: 0,
          category: 'Others',
          id: '124',
        },
      ];

      jest.spyOn(model, 'find').mockReturnValue(of(expected) as any);

      const result = repository.findProductsById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an empty array', async () => {
      const data = ['124', '123'];

      const expected = [];

      jest.spyOn(model, 'find').mockReturnValue(of(expected) as any);

      const result = repository.findProductsById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = ['124', '123'];

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'find').mockRejectedValue(of(mock) as any);

      const result = repository.findProductsById(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
