import { IErrorValueObject, ValueObjectBase } from '../../../../lib/sofka';

type UserName = {
  userName: string;
  userLastName: string;
};

export class UserNameValueObject extends ValueObjectBase<UserName> {
  MIN_EXTENSION = 3;
  MAX_EXTENSION = 100;

  validateData(): void {
    this.minContryExtension();
    this.minCityExtension();
    this.maxCountryExtension();
    this.maxCityExtension();
  }

  minContryExtension(): void {
    if (this.value.userName.length < this.MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCountry',
        message: `Location Country must be at least ${this.MIN_EXTENSION} characters`,
      };
    }
  }

  minCityExtension(): void {
    if (this.value.userLastName.length < this.MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'Location City',
        message: `Location City must be at least ${this.MIN_EXTENSION} characters`,
      };
    }
  }

  maxCountryExtension(): void {
    if (this.value.userName.length > this.MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCountry',
        message: `Location Country must be maximum ${this.MAX_EXTENSION} characters`,
      };
    }
  }

  maxCityExtension(): void {
    if (this.value.userLastName.length > this.MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCity',
        message: `Location City must be maximum ${this.MAX_EXTENSION} characters`,
      };
    }
  }
}
