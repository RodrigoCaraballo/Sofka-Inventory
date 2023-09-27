import { IErrorValueObject, ValueObjectBase } from '../../../../lib/sofka';

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
      this.setError(error);
    }
  }
}
