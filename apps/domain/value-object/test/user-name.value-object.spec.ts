import { UserNameValueObject } from '../user-name.value-object';

describe('UserNameValueObject', () => {
  it('should create a valid UserNameValueObject', () => {
    const validUserName = {
      userName: 'John',
      userLastName: 'Doe',
    }; // Modifica según tus necesidades
    const userNameValueObject = new UserNameValueObject(validUserName);
    expect(userNameValueObject).toBeInstanceOf(UserNameValueObject);
  });

  it('should throw an error when user name is too short', () => {
    const invalidUserName = {
      userName: 'Jo',
      userLastName: 'Doe',
    }; // Modifica según tus necesidades
    expect(() => new UserNameValueObject(invalidUserName)).toThrowError(
      'User Name must be at least 3 characters',
    );
  });

  it('should throw an error when user last name is too short', () => {
    const invalidUserName = {
      userName: 'John',
      userLastName: 'D',
    }; // Modifica según tus necesidades
    expect(() => new UserNameValueObject(invalidUserName)).toThrowError(
      'User LastName must be at least 3 characters',
    );
  });

  it('should throw an error when user name is too long', () => {
    const invalidUserName = {
      userName: 'J'.repeat(101),
      userLastName: 'Doe',
    }; // Modifica según tus necesidades
    expect(() => new UserNameValueObject(invalidUserName)).toThrowError(
      'User Name must be maximum 100 characters',
    );
  });

  it('should throw an error when user last name is too long', () => {
    const invalidUserName = {
      userName: 'John',
      userLastName: 'D'.repeat(101),
    }; // Modifica según tus necesidades
    expect(() => new UserNameValueObject(invalidUserName)).toThrowError(
      'User Last Name must be maximum 100 characters',
    );
  });
});
