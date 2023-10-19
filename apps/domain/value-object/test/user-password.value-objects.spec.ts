import { UserPasswordValueObject } from '../user-password.value-objects';

describe('UserPasswordValueObject', () => {
  it('should create a valid UserPasswordValueObject', () => {
    const validPassword = 'Rodrigo1234';
    const userPasswordValueObject = new UserPasswordValueObject(validPassword);
    expect(userPasswordValueObject).toBeInstanceOf(UserPasswordValueObject);
  });

  it('should throw an error when password is too short', () => {
    const invalidPassword = 'Abc1';
    expect(() => new UserPasswordValueObject(invalidPassword)).toThrowError(
      'User Password must be at least 8 characters',
    );
  });

  it('should throw an error when password is too long', () => {
    const invalidPassword = 'Abc123456789012345';
    expect(() => new UserPasswordValueObject(invalidPassword)).toThrowError(
      'User Password must be maximum 16 characters',
    );
  });

  it('should throw an error when password does not match the pattern', () => {
    const invalidPassword = 'abdascfets';
    expect(() => new UserPasswordValueObject(invalidPassword)).toThrowError(
      'User Password is not a valid pattern',
    );
  });

  it('should throw an error when password is missing an uppercase character', () => {
    const invalidPassword = 'abdascfets';
    expect(() => new UserPasswordValueObject(invalidPassword)).toThrowError(
      'User Password is not a valid pattern',
    );
  });

  it('should throw an error when password is missing a lowercase character', () => {
    const invalidPassword = 'ABC12345';
    expect(() => new UserPasswordValueObject(invalidPassword)).toThrowError(
      'User Password is not a valid pattern',
    );
  });

  it('should throw an error when password is missing a digit', () => {
    const invalidPassword = 'abcdefgh';
    expect(() => new UserPasswordValueObject(invalidPassword)).toThrowError(
      'User Password is not a valid pattern',
    );
  });
});
