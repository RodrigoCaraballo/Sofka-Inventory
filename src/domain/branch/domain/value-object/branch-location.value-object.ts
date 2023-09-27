import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

type Location = {
  country: string;
  city: string;
};

export class BranchLocationValueObject extends ValueObjectBase<Location> {
  MIN_EXTENSION = 3;
  MAX_COUNTRY_EXTENSION = 35;
  MAX_CITY_EXTENSION = 85;

  validateData(): void {
    this.minContryExtension();
    this.minCityExtension();
    this.maxCountryExtension();
    this.maxCityExtension();
  }

  minContryExtension(): void {
    if (this.value.country.length > this.MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCountry',
        message: `Location Country must be at least ${this.MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  minCityExtension(): void {
    if (this.value.city.length > this.MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'Location City',
        message: `Location City must be at least ${this.MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxCountryExtension(): void {
    if (this.value.country.length > this.MAX_COUNTRY_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCountry',
        message: `Location Country must be maximum ${this.MAX_COUNTRY_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxCityExtension(): void {
    if (this.value.city.length > this.MAX_CITY_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCity',
        message: `Location City must be maximum ${this.MAX_CITY_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
