import { BranchLocationValueObject } from '../../../../../src/domain/branch/domain/value-object';
import { ValueObjectException } from '../../../../../src/lib/sofka';

describe('Branch Location VO', () => {
  test('Should return a value object without errores', () => {
    const country = 'Uruguay';
    const city = 'Paysandu';
    const branchLocationVO = new BranchLocationValueObject({ country, city });

    expect(branchLocationVO.valueOf().country).toBe(country);
    expect(branchLocationVO.valueOf().city).toBe(city);
  });

  test('Should return an error when country < MIN_EXTENSION', () => {
    const country = 'U';
    const city = 'Paysandu';

    expect(() => new BranchLocationValueObject({ country, city })).toThrowError(
      ValueObjectException,
    );
  });

  test('Should return an error when country < MAX_COUNTRY_EXTENSION', () => {
    const country = 'Ujsnamstenaltegatalsdetredasmntemandast';
    const city = 'Paysandu';

    expect(() => new BranchLocationValueObject({ country, city })).toThrowError(
      ValueObjectException,
    );
  });

  test('Should return an error when city < MIN_EXTENSION', () => {
    const country = 'Uruguay';
    const city = 'Pa';

    expect(() => new BranchLocationValueObject({ country, city })).toThrowError(
      ValueObjectException,
    );
  });

  test('Should return an error when country < MAX_CITY_EXTENSION', () => {
    const country = 'Uruguay';
    const city =
      'abcdefghijklmnopqrstuvwxyzyxwvutsrqponmlkjihgfedcbaabcdefghijklmnopqrstuvwxyzyxwvutsrqponmlkjihgfedcba';

    expect(() => new BranchLocationValueObject({ country, city })).toThrowError(
      ValueObjectException,
    );
  });
});
