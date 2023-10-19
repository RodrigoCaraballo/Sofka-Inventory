import { UserEmailValueObject } from '../user-email.value-object';

describe('UserEmailValueObject', () => {
  it('should create a valid UserEmailValueObject', () => {
    const validEmail = 'user@example.com';
    const emailValueObject = new UserEmailValueObject(validEmail);
    expect(emailValueObject).toBeInstanceOf(UserEmailValueObject);
  });

  it('should throw an error for an invalid email', () => {
    const invalidEmail = 'invalid_email';
    expect(() => new UserEmailValueObject(invalidEmail)).toThrowError(
      'User Email is not a valid email',
    );
  });
});
