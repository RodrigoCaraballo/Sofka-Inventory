import { SuperAdminGuard } from '@CommandInfrastructure';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('UserGuard', () => {
  let superAdminGuard: SuperAdminGuard;
  let context: ExecutionContext;
  let contextFalse: ExecutionContext;
  let contextEmpty: ExecutionContext;

  beforeEach(async () => {
    superAdminGuard = new SuperAdminGuard();
    context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTI4OWI0MTE5YWNjMzE3NGI3MWQ0ZGYiLCJ1c2VyRW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJ1c2VyUm9sZSI6InN1cGVyIGFkbWluIiwiYnJhbmNoSWQiOiIxIiwiaWF0IjoxNjk3NzEzMzMzLCJleHAiOjE2OTc3NTY1MzN9.KSHP5L7OtPoBB9NFMEjtBr7ZSwjdsH9WQe8IhWbL75M',
          },
        }),
      }),
    } as ExecutionContext;
    contextFalse = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Ijp0cnVlLCJ1c2VybmFtZSI6Imdlc3NpIiwiaWF0IjoxNjgwODk5NTkyfQ',
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
      const result = superAdminGuard.canActivate(context);

      result.subscribe((value) => {
        expect(value).toEqual(true);
      });
    });

    test('should return error if the token is invalid', () => {
      try {
        superAdminGuard.canActivate(contextFalse);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    test('should return false if the token is invalid', () => {
      const result = superAdminGuard.canActivate(contextEmpty);

      result.subscribe((value) => {
        expect(value).toBeFalsy();
      });
    });
  });
});
