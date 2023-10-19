import { IUser } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { lastValueFrom, of } from 'rxjs';
import {
  UserMongoose,
  UserMongooseDocument,
} from '../../../../../authorization/src/infrastructure/database/entity/user.document';
import { UserMongooseRepository } from '../../../../../authorization/src/infrastructure/database/repository/user.repository';

describe('User Mongoose Repository', () => {
  let repository: UserMongooseRepository;
  let model: Model<UserMongooseDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMongooseRepository,
        {
          provide: getModelToken(UserMongoose.name),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            countDocuments: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<UserMongooseRepository>(UserMongooseRepository);
    model = module.get<Model<UserMongooseDocument>>(
      getModelToken(UserMongoose.name),
    );
  });

  describe('saveEvent', () => {
    test('should save and return the saved model', async () => {
      const data: IUser = {
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'password',
        role: 'admin',
      };

      const expected: IUser = {
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'password',
        role: 'admin',
      };

      jest.spyOn(model, 'create').mockReturnValue(of(expected) as any);

      const result = repository.saveUser(data);
      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const data: IUser = {
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'password',
        role: 'admin',
      };

      const expected = new InternalServerErrorException('Something went wrong');

      jest.spyOn(model, 'create').mockReturnValue(of(expected) as any);

      const result = repository.saveUser(data);
      expect(await lastValueFrom(result)).toEqual(expected);
    });
  });

  describe('findUserById', () => {
    test('should return a user', async () => {
      const userId = '1';

      const expected: IUser = {
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'password',
        role: 'admin',
      };

      jest.spyOn(model, 'findById').mockReturnValue(of(expected) as any);

      const result = repository.findUserById(userId);
      const resultPromise = lastValueFrom(result);

      expect(await resultPromise).toEqual(expected);
    });

    test('should return a undefined', async () => {
      const userId = '1';

      const expected: IUser = undefined;

      jest.spyOn(model, 'findById').mockReturnValue(of(expected) as any);

      const result = repository.findUserById(userId);
      const resultPromise = lastValueFrom(result);

      expect(await resultPromise).toEqual(expected);
    });

    test('should return an error', async () => {
      const userId = '1';

      jest
        .spyOn(model, 'findById')
        .mockRejectedValue(
          new InternalServerErrorException('Something went wrong'),
        );

      const result = repository.findUserById(userId);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('findUserByEmail', () => {
    test('should return a user', async () => {
      const userId = 'foo@bar.com';

      const expected: IUser = {
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'password',
        role: 'admin',
      };

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findUserByEmail(userId);
      const resultPromise = lastValueFrom(result);

      expect(await resultPromise).toEqual(expected);
    });

    test('should return a undefined', async () => {
      const userId = '1';

      const expected: IUser = undefined;

      jest.spyOn(model, 'findOne').mockReturnValue(of(expected) as any);

      const result = repository.findUserByEmail(userId);
      const resultPromise = lastValueFrom(result);

      expect(await resultPromise).toEqual(expected);
    });

    test('should return an error', async () => {
      const userId = '1';

      jest
        .spyOn(model, 'findOne')
        .mockRejectedValue(
          new InternalServerErrorException('Something went wrong'),
        );

      const result = repository.findUserByEmail(userId);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('countDocuments', () => {
    test('should return a number of total docuements into schema', async () => {
      const expected = 1;

      const findSpy = jest.spyOn(model, 'countDocuments');
      const execSpy = jest.fn().mockReturnValue(of(expected) as any);

      findSpy.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = repository.countDocuments();

      expect(await lastValueFrom(result)).toEqual(expected);
    });

    test('should return an error when something fails', async () => {
      const expected = new InternalServerErrorException('Something went wrong');

      const findSpy = jest.spyOn(model, 'countDocuments');
      const execSpy = jest.fn().mockRejectedValue(of(expected) as any);

      findSpy.mockReturnValue({
        exec: execSpy,
      } as any);

      const result = repository.countDocuments();

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
