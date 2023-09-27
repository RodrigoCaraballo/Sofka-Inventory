import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

type Location = {
  country: string;
  city: string;
};

const MIN_EXTENSION = 3;
const MAX_COUNTRY_EXTENSION = 35;
const MAX_CITY_EXTENSION = 85;

export class BranchLocationValueObject extends ValueObjectBase<Location> {
  validateData(): void {
    this.minContryExtension();
    this.minCityExtension();
    this.maxCountryExtension();
    this.maxCityExtension();
  }

  minContryExtension(): void {
    if (this.value.country.length > MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCountry',
        message: `Location Country must be at least ${MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  minCityExtension(): void {
    if (this.value.city.length > MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'Location City',
        message: `Location City must be at least ${MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxCountryExtension(): void {
    if (this.value.country.length > MAX_COUNTRY_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCountry',
        message: `Location Country must be maximum ${MAX_COUNTRY_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxCityExtension(): void {
    if (this.value.city.length > MAX_CITY_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'LocationCity',
        message: `Location City must be maximum ${MAX_CITY_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
