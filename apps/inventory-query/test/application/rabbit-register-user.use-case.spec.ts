import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom, of, throwError } from 'rxjs';
import { IBranch, IUser, RegisterUserData } from '../../../domain';
import { RabbitRegisterUserUseCase } from '../../src/application';
import {
  BranchTypeOrmRepository,
  UserTypeOrmRepository,
} from '../../src/infrastructure';

describe('Rabbit Register Product Use Case', () => {
  let useCase: RabbitRegisterUserUseCase;
  let repositoryBranch: BranchTypeOrmRepository;
  let repositoryUser: UserTypeOrmRepository;

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
          provide: UserTypeOrmRepository,
          useValue: {
            saveUser: jest.fn(),
          },
        },
        {
          provide: RabbitRegisterUserUseCase,
          useFactory: (
            repositoryUser: UserTypeOrmRepository,
            repositoryBranch: BranchTypeOrmRepository,
          ) => new RabbitRegisterUserUseCase(repositoryUser, repositoryBranch),
          inject: [UserTypeOrmRepository, BranchTypeOrmRepository],
        },
      ],
    }).compile();
    useCase = module.get<RabbitRegisterUserUseCase>(RabbitRegisterUserUseCase);
    repositoryBranch = module.get<BranchTypeOrmRepository>(
      BranchTypeOrmRepository,
    );
    repositoryUser = module.get<UserTypeOrmRepository>(UserTypeOrmRepository);
  });

  describe('execute', () => {
    test('should return registered branch', async () => {
      const data: RegisterUserData = {
        name: 'foo',
        lastName: 'bar',
        branchId: '123',
        email: 'foo@bar.com',
        password: 'Rodrigo1234',
        role: 'admin',
      };

      const mockBranch: IBranch = {
        id: '123',
        name: 'foo',
        city: 'bar',
        country: 'bar',
        employees: [],
        products: [],
      };

      const mockUser: IUser = {
        id: '123',
        name: 'foo',
        lastName: 'bar',
        email: 'foo@bar.com',
        password: 'Rodrigo1234',
        role: 'admin',
      };

      const repositorySpyBranch = jest
        .spyOn(repositoryBranch, 'findBranchById')
        .mockReturnValue(of(mockBranch));
      const repositorySpyProduct = jest
        .spyOn(repositoryUser, 'saveUser')
        .mockReturnValue(of(mockUser));

      const result = useCase.execute(data);

      expect(repositorySpyBranch).toHaveBeenCalled();
      //   expect(repositorySpyProduct).toHaveBeenCalled();

      expect(await lastValueFrom(result)).toEqual(mockUser);
    });

    test('should return an error on find', async () => {
      const data: RegisterUserData = {
        name: 'foo',
        lastName: 'bar',
        branchId: '123',
        email: 'foo@bar.com',
        password: 'Rodrigo1234',
        role: 'admin',
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
      const data: RegisterUserData = {
        name: 'foo',
        lastName: 'bar',
        branchId: '123',
        email: 'foo@bar.com',
        password: 'Rodrigo1234',
        role: 'admin',
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
        .spyOn(repositoryUser, 'saveUser')
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
