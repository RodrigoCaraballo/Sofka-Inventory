import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { lastValueFrom, of } from 'rxjs';
import { Repository } from 'typeorm';
import {
  BranchTypeOrmEntity,
  BranchTypeOrmRepository,
} from '../../../../src/infrastructure/database';

describe('Branch TypeOrm Repository', () => {
  let repository: BranchTypeOrmRepository;
  let model: Repository<BranchTypeOrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BranchTypeOrmRepository,
        {
          provide: getRepositoryToken(BranchTypeOrmEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<BranchTypeOrmRepository>(BranchTypeOrmRepository);
    model = module.get<Repository<BranchTypeOrmEntity>>(
      getRepositoryToken(BranchTypeOrmEntity),
    );
  });

  describe('saveBranch', () => {
    test('Should return the saved branch', async () => {
      const data = {
        name: 'foo',
        city: 'foo',
        country: 'foo',
        products: [],
        employees: [],
      };

      const expected = {
        ...data,
        id: '123',
      };

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveBranch(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = {
        name: 'foo',
        city: 'foo',
        country: 'foo',
        products: [],
        employees: [],
      };

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'save').mockRejectedValue(of(mock) as any);

      const result = repository.saveBranch(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findBranchById', () => {
    test('Should return a branch', async () => {
      const data = '123';

      const expected = {
        id: '123',
        name: 'foo',
        city: 'foo',
        country: 'foo',
      };

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findBranchById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an undefined', async () => {
      const data = '123';

      const expected = undefined;

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findBranchById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = '123';

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'findOne').mockRejectedValue(of(mock) as any);

      const result = repository.findBranchById(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findBranchByIdWithRelations', () => {
    test('Should return a branch with relations', async () => {
      const data = '123';

      const expected = {
        id: '123',
        name: 'foo',
        city: 'foo',
        country: 'foo',
        products: [],
        employees: [],
      };

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findBranchByIdWithRelations(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an undefined', async () => {
      const data = '123';

      const expected = undefined;

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findBranchByIdWithRelations(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = '123';

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'findOne').mockRejectedValue(of(mock) as any);

      const result = repository.findBranchByIdWithRelations(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findAllBranches', () => {
    test('Should return all branches', async () => {
      const expected = [
        {
          id: '123',
          name: 'foo',
          city: 'foo',
          country: 'foo',
          products: [],
          employees: [],
        },
        {
          id: '124',
          name: 'foo',
          city: 'foo',
          country: 'foo',
          products: [],
          employees: [],
        },
      ];

      jest.spyOn(model, 'find').mockReturnValue(of(expected) as any);

      const result = repository.findAllBranches();

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an empty array', async () => {
      const expected = [];

      jest.spyOn(model, 'find').mockReturnValue(of(expected) as any);

      const result = repository.findAllBranches();

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'find').mockRejectedValue(of(mock) as any);

      const result = repository.findAllBranches();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
