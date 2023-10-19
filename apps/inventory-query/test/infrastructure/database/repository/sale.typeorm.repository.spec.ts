import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { lastValueFrom, of } from 'rxjs';
import { Repository } from 'typeorm';
import {
  SaleTypeOrmEntity,
  SaleTypeOrmRepository,
} from '../../../../src/infrastructure/database';

describe('Sale TypeOrm Repository', () => {
  let repository: SaleTypeOrmRepository;
  let model: Repository<SaleTypeOrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaleTypeOrmRepository,
        {
          provide: getRepositoryToken(SaleTypeOrmEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<SaleTypeOrmRepository>(SaleTypeOrmRepository);
    model = module.get<Repository<SaleTypeOrmEntity>>(
      getRepositoryToken(SaleTypeOrmEntity),
    );
  });

  describe('findSales', () => {
    test('Should return sales', async () => {
      const data = '123';

      const expected = [
        {
          id: '123',
          invoiceNumber: '123',
          type: 'RESELLER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
        {
          id: '124',
          invoiceNumber: '123',
          type: 'FINAL_CUSTOMER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
      ];

      jest.spyOn(model, 'find').mockReturnValue(of(expected) as any);

      const result = repository.findSales(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return saved sales', async () => {
      const data = '123';

      const expected = [];

      jest.spyOn(model, 'find').mockReturnValue(of(expected) as any);

      const result = repository.findSales(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = '123';

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'find').mockRejectedValue(of(mock) as any);

      const result = repository.findSales(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('saveSales', () => {
    test('Should return saved sales', async () => {
      const data = [
        {
          invoiceNumber: '123',
          type: 'RESELLER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
        {
          invoiceNumber: '123',
          type: 'FINAL_CUSTOMER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
      ];

      const expected = [
        {
          id: '123',
          invoiceNumber: '123',
          type: 'RESELLER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
        {
          id: '124',
          invoiceNumber: '123',
          type: 'FINAL_CUSTOMER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
      ];

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveSales(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return saved sales', async () => {
      const data = [
        {
          invoiceNumber: '123',
          type: 'RESELLER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
        {
          invoiceNumber: '123',
          type: 'FINAL_CUSTOMER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
      ];

      const expected = [];

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveSales(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = [
        {
          invoiceNumber: '123',
          type: 'RESELLER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
        {
          invoiceNumber: '123',
          type: 'FINAL_CUSTOMER',
          productName: 'Sugar',
          productPrice: 23,
          quantity: 1,
        },
      ];

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'save').mockRejectedValue(of(mock) as any);

      const result = repository.saveSales(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findSaleByInvoiceNumberAndProductId', () => {
    test('Should return a sale', async () => {
      const invoiceNumber = '123';
      const id = '124';

      const expected = {
        id: '123',
        invoiceNumber: '123',
        type: 'RESELLER',
        productName: 'Sugar',
        productPrice: 23,
        quantity: 1,
      };

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findSaleByInvoiceNumberAndProductId(
        invoiceNumber,
        id,
      );

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return saved sales', async () => {
      const invoiceNumber = '123';
      const id = '124';

      const expected = undefined;

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findSaleByInvoiceNumberAndProductId(
        invoiceNumber,
        id,
      );

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const invoiceNumber = '123';
      const id = '124';

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'findOne').mockRejectedValue(of(mock) as any);

      const result = repository.findSaleByInvoiceNumberAndProductId(
        invoiceNumber,
        id,
      );

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('saveSale', () => {
    test('Should return a saved sale', async () => {
      const data = {
        invoiceNumber: '123',
        type: 'RESELLER',
        productName: 'Sugar',
        productPrice: 23,
        quantity: 1,
      };

      const expected = {
        id: '123',
        invoiceNumber: '123',
        type: 'RESELLER',
        productName: 'Sugar',
        productPrice: 23,
        quantity: 1,
      };

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveSale(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return saved sales', async () => {
      const data = {
        invoiceNumber: '123',
        type: 'RESELLER',
        productName: 'Sugar',
        productPrice: 23,
        quantity: 1,
      };

      const expected = undefined;

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveSale(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = {
        invoiceNumber: '123',
        type: 'RESELLER',
        productName: 'Sugar',
        productPrice: 23,
        quantity: 1,
      };

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'save').mockRejectedValue(of(mock) as any);

      const result = repository.saveSale(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
