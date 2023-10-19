import { AuthGuard, EventMongooseRepository } from '@CommandInfrastructure';
import { IEvent, IEventRepository, RegisterUserData } from '@Domain';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

describe('UserGuard', () => {
  let authGuard: AuthGuard;
  let repository: IEventRepository;
  let context: ExecutionContext;
  let contextFalse: ExecutionContext;
  let contextEmpty: ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: EventMongooseRepository,
          useValue: {
            existUser: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<EventMongooseRepository>(EventMongooseRepository);
    authGuard = new AuthGuard(repository);

    context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI2ZTE5YWNjMzE3NGI3MWQ0ZTIiLCJ1c2VyRW1haWwiOiJtYXRlb0BtYWlsLmNvbSIsInVzZXJSb2xlIjoiYWRtaW4iLCJicmFuY2hJZCI6IjZiZWViMzZkLTE2ZjItNGI3OC1iYzQzLTNhZjQ5YjU3MmQ3MiIsImlhdCI6MTY5NzcxNTgzNSwiZXhwIjoxNjk3NzU5MDM1fQ.qvpeyMTNnONYL6-r5olK6wayBh6kW1EcOJ7u6fUvKXI',
          },
        }),
      }),
    } as ExecutionContext;
    contextFalse = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzEzMzMzLCJleHAiOjE2OTc3NTY1MzN9',
          },
        }),
      }),
    } as ExecutionContext;
    contextEmpty = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as ExecutionContext;
  });

  describe('canActivate', () => {
    test('should return true if the token is valid', () => {
      const result = authGuard.canActivate(context);
      const eventData: RegisterUserData = {
        branchId: '12',
        email: 'test@example.com',
        lastName: 'test',
        name: 'test',
        password: 'test',
        role: 'admin',
      };

      const event: IEvent = {
        eventAggregateRootId: '1',
        eventPublishedAt: new Date(),
        eventType: 'GENERIC',
        eventData: eventData,
      };

      jest.spyOn(repository, 'existUser').mockReturnValue(of(event));

      result.subscribe((value) => {
        expect(value).toBeTruthy();
      });
    });

    test('should return error if the token is invalid', () => {
      try {
        authGuard.canActivate(contextFalse);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
    test('should return false if the token is invalid', () => {
      const result = authGuard.canActivate(contextEmpty);

      result.subscribe((value) => {
        expect(value).toBeFalsy();
      });
    });
  });
});
