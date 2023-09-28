import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

const REGEX = '^[^@]+@[^@]+.[a-zA-Z]{2,}$';

export class UserEmailValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.emailPattern();
  }

  emailPattern(): void {
    if (!this.value.match(REGEX)) {
      const error: IErrorValueObject = {
        field: 'UserEmail',
        message: 'User Email is not a valid email',
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
