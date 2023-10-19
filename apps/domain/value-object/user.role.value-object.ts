import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../lib';

enum USEROLE {
  Super_Admin = 'super admin',
  Admin = 'admin',
  Employee = 'employee',
}

export class UserRoleValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.isIntoEnum();
  }

  isIntoEnum(): void {
    if (!Object.values(USEROLE).toString().includes(this.value.toLowerCase())) {
      const error: IErrorValueObject = {
        field: 'UserRole',
        message: 'User Role is not a valid value',
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
