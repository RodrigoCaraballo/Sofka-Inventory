import { IUser, RegisterUserData } from '@Domain';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { RegisterUserListenerUseCase } from '../../../authorization/src/application/register-user.use-case';
import { UserMongooseRepository } from '../../../authorization/src/infrastructure/database/repository/user.repository';

describe('Register Use Case AUTH', () => {
  let useCase: RegisterUserListenerUseCase;
  let repository: UserMongooseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserMongooseRepository,
          useValue: {
            saveUser: jest.fn(),
          },
        },
        {
          provide: RegisterUserListenerUseCase,
          useFactory: (repository: UserMongooseRepository) =>
            new RegisterUserListenerUseCase(repository),
          inject: [UserMongooseRepository],
        },
      ],
    }).compile();
    useCase = module.get<RegisterUserListenerUseCase>(
      RegisterUserListenerUseCase,
    );
    repository = module.get<UserMongooseRepository>(UserMongooseRepository);
  });

  describe('execute', () => {
    test('should recive authdata and return a token', async () => {
      const data: RegisterUserData = {
        email: 'email@example.com',
        password: 'Rodrigo1234',
        lastName: 'Bar',
        name: 'John',
        role: 'admin',
        branchId: '1',
      };

      const mock: IUser = {
        email: 'email@example.com',
        password: 'Rodrigo1234',
        lastName: 'Bar',
        name: 'John',
        role: 'admin',
      };

      const repositorySpy = jest
        .spyOn(repository, 'saveUser')
        .mockReturnValue(of(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data);

      expect(await lastValueFrom(result)).toEqual(mock);
    });

    test('should throw bad request exception if passwords dont match', async () => {
      const data: RegisterUserData = {
        email: 'email@example.com',
        password: 'Rodrigo1234',
        lastName: 'Bar',
        name: 'John',
        role: 'admin',
        branchId: '1',
      };

      const mock = new InternalServerErrorException('Something went wrong');

      const repositorySpy = jest
        .spyOn(repository, 'saveUser')
        .mockReturnValue(throwError(mock));

      const result = useCase.execute(data);

      expect(repositorySpy).toHaveBeenCalledWith(data);

      await expect(lastValueFrom(result)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });
});
