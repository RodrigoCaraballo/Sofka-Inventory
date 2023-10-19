import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { lastValueFrom, of } from 'rxjs';
import { Repository } from 'typeorm';
import {
  UserTypeOrmEntity,
  UserTypeOrmRepository,
} from '../../../../src/infrastructure/database';

describe('User TypeOrm Repository', () => {
  let repository: UserTypeOrmRepository;
  let model: Repository<UserTypeOrmEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTypeOrmRepository,
        {
          provide: getRepositoryToken(UserTypeOrmEntity),
          useValue: {
            findOne: jest.fn(),
            find: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<UserTypeOrmRepository>(UserTypeOrmRepository);
    model = module.get<Repository<UserTypeOrmEntity>>(
      getRepositoryToken(UserTypeOrmEntity),
    );
  });

  describe('saveUser', () => {
    test('Should return the saved user', async () => {
      const data = {
        name: 'foo',
        lastName: 'foo',
        password: 'foo',
        email: 'foo@example.com',
        role: 'admin',
      };

      const expected = {
        ...data,
        id: '123',
      };

      jest.spyOn(model, 'save').mockReturnValue(of(expected) as any);

      const result = repository.saveUser(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = {
        name: 'foo',
        lastName: 'foo',
        password: 'foo',
        email: 'foo@example.com',
        role: 'admin',
      };

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'save').mockRejectedValue(of(mock) as any);

      const result = repository.saveUser(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findUserById', () => {
    test('Should return an user', async () => {
      const data = '123';

      const expected = {
        id: '123',
        name: 'foo',
        lastName: 'foo',
        password: 'foo',
        email: 'foo@example.com',
        role: 'admin',
      };

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findUserById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an undefined', async () => {
      const data = '123';

      const expected = undefined;

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findUserById(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = '123';

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'findOne').mockRejectedValue(of(mock) as any);

      const result = repository.findUserById(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findUserByEmail', () => {
    test('Should return an user', async () => {
      const data = 'foo@example.com';

      const expected = {
        id: '123',
        name: 'foo',
        lastName: 'foo',
        password: 'foo',
        email: 'foo@example.com',
        role: 'admin',
      };

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findUserByEmail(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an undefined', async () => {
      const data = 'foo@example.com';

      const expected = undefined;

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findUserByEmail(data);

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('Should return an error when something fails', async () => {
      const data = 'foo@example.com';

      const mock = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'findOne').mockRejectedValue(of(mock) as any);

      const result = repository.findUserByEmail(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
