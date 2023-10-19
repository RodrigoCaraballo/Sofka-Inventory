import { RegisterUserData } from '@Domain';
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserListenerUseCase } from '../../../../authorization/src/application/register-user.use-case';
import { MessagingUserHandler } from '../../../../authorization/src/infrastructure/listener/register-user.use-case';

describe('RegisterUser Listener', () => {
  let listener: MessagingUserHandler;
  let useCase: RegisterUserListenerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RegisterUserListenerUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: MessagingUserHandler,
          useFactory: (useCase: RegisterUserListenerUseCase) =>
            new MessagingUserHandler(useCase),
          inject: [RegisterUserListenerUseCase],
        },
      ],
    }).compile();
    listener = module.get<MessagingUserHandler>(MessagingUserHandler);
    useCase = module.get<RegisterUserListenerUseCase>(
      RegisterUserListenerUseCase,
    );
  });

  describe('all', () => {
    test('should call execute function', () => {
      const data: RegisterUserData = {
        branchId: '123',
        email: 'test@example.com',
        lastName: 'test',
        name: 'test',
        password: 'test',
        role: 'admin',
      };

      const stringData = JSON.stringify(data);

      const spy = jest.spyOn(useCase, 'execute');

      listener.registerBranch(stringData);

      expect(spy).toHaveBeenCalled();
    });
  });
});
