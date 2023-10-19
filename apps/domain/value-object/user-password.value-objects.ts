import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../lib';

const MIN_EXTENSION = 8;
const MAX_EXTENSION = 16;
const REGEX = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\n\r]+$`);

export class UserPasswordValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.minPasswordLength();
    this.maxPasswordLength();
    this.passwordPattern();
  }

  minPasswordLength(): void {
    if (this.value.length < MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserPassword',
        message: `User Password must be at least ${MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxPasswordLength(): void {
    if (this.value.length > MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserPassword',
        message: `User Password must be maximum ${MAX_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  passwordPattern(): void {
    if (!REGEX.test(this.value)) {
      const error: IErrorValueObject = {
        field: 'UserPassword',
        message: 'User Password is not a valid pattern',
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
