import { IErrorValueObject, ValueObjectBase } from '../../../../lib/sofka';

export class UserEmailValueObject extends ValueObjectBase<string> {
  REGEX = '^[^@]+@[^@]+.[a-zA-Z]{2,}$';

  validateData(): void {
    this.emailPattern();
  }

  emailPattern(): void {
    if (!this.value.match(this.REGEX)) {
      const error: IErrorValueObject = {
        field: 'UserEmail',
        message: 'User Email is not a valid email',
      };
    }
  }
}
