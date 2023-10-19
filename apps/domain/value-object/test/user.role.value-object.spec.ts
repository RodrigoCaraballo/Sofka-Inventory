import { UserRoleValueObject } from '../user.role.value-object';

describe('UserRoleValueObject', () => {
  it('should create a valid UserRoleValueObject', () => {
    const validRole = 'super admin';
    const userRoleValueObject = new UserRoleValueObject(validRole);
    expect(userRoleValueObject).toBeInstanceOf(UserRoleValueObject);
  });

  it('should throw an error when role is not a valid value', () => {
    const invalidRole = 'invalid';
    expect(() => new UserRoleValueObject(invalidRole)).toThrowError(
      'User Role is not a valid value',
    );
  });

  it('should be case-insensitive for role values', () => {
    const validRole = 'Admin';
    const userRoleValueObject = new UserRoleValueObject(validRole);
    expect(userRoleValueObject).toBeInstanceOf(UserRoleValueObject);
  });
});
