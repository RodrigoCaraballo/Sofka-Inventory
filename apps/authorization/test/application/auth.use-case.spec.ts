import { IUser } from '@Domain';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of } from 'rxjs';
import { UserMongooseRepository } from '../../../authorization/src/infrastructure/database/repository/user.repository';
import { AuthUseCase } from '../../src/application/auth.use-case';

describe('Auth Use Case AUTH', () => {
  let useCase: AuthUseCase;
  let repository: UserMongooseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserMongooseRepository,
          useValue: {
            findUserByEmail: jest.fn(),
          },
        },
        {
          provide: AuthUseCase,
          useFactory: (repository: UserMongooseRepository) =>
            new AuthUseCase(repository),
          inject: [UserMongooseRepository],
        },
      ],
    }).compile();
    useCase = module.get<AuthUseCase>(AuthUseCase);
    repository = module.get<UserMongooseRepository>(UserMongooseRepository);
  });

  describe('execute', () => {
    test('should recive authdata and return a token', async () => {
      const data = {
        email: 'email@example.com',
        password: 'Rodrigo1234',
      };

      const mock: IUser = {
        email: 'email@example.com',
        password: 'Rodrigo1234',
        lastName: 'Bar',
        name: 'John',
        role: 'admin',
      };

      const repositorySpy = jest
        .spyOn(repository, 'findUserByEmail')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data.email);

      expect(await lastValueFrom(result)).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        }),
      );
    });

    test('should throw bad request exception if user is undefined', async () => {
      const data = {
        email: 'email@example.com',
        password: 'Rodrigo1234',
      };

      const mock = undefined;

      const repositorySpy = jest
        .spyOn(repository, 'findUserByEmail')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data.email);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        BadRequestException,
      );
    });

    test('should throw bad request exception if passwords dont match', async () => {
      const data = {
        email: 'email@example.com',
        password: 'Rodrigo1234',
      };

      const mock: IUser = {
        email: 'email@example.com',
        password: 'Rodrigo123',
        lastName: 'Bar',
        name: 'John',
        role: 'admin',
      };

      const repositorySpy = jest
        .spyOn(repository, 'findUserByEmail')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data.email);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });
});
