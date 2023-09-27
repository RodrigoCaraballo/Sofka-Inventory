import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

export class UserPasswordValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 8;
  MAX_EXTENSION = 16;
  REGEX = '^(?=w*d)(?=w*[A-Z])(?=w*[a-z])S{8,16}$';

  validateData(): void {
    this.minPasswordLength();
    this.maxPasswordLength();
    this.passwordPattern();
  }

  minPasswordLength(): void {
    if (this.value.length < this.MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserPassword',
        message: `User Password must be at least ${this.MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxPasswordLength(): void {
    if (this.value.length > this.MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserPassword',
        message: `User Password must be maximum ${this.MAX_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  passwordPattern(): void {
    if (!this.value.match(this.REGEX)) {
      const error: IErrorValueObject = {
        field: 'UserPassword',
        message: 'User Password is not a valid pattern',
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
