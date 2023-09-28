import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '@Sofka';

type UserName = {
  userName: string;
  userLastName: string;
};

const MIN_EXTENSION = 3;
const MAX_EXTENSION = 100;

export class UserNameValueObject extends ValueObjectBase<UserName> {
  validateData(): void {
    this.minContryExtension();
    this.minCityExtension();
    this.maxCountryExtension();
    this.maxCityExtension();
  }

  minContryExtension(): void {
    if (this.value.userName.length < MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserName',
        message: `User Name must be at least ${MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  minCityExtension(): void {
    if (this.value.userLastName.length < MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserLastName',
        message: `User LastName must be at least ${MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxCountryExtension(): void {
    if (this.value.userName.length > MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserName',
        message: `User Name must be maximum ${MAX_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxCityExtension(): void {
    if (this.value.userLastName.length > MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'UserLastName',
        message: `User Last Name must be maximum ${MAX_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
