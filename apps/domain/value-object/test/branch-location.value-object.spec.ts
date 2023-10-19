import { BranchLocationValueObject } from '../branch-location.value-object';

describe('BranchLocationValueObject', () => {
  const validLocation = {
    country: 'ValidCountry',
    city: 'ValidCity',
  };

  it('should create a valid BranchLocationValueObject', () => {
    const locationValueObject = new BranchLocationValueObject(validLocation);

    expect(locationValueObject).toBeInstanceOf(BranchLocationValueObject);
  });

  it('should throw an error when country is too short', () => {
    const invalidLocation = {
      country: 'A',
      city: 'ValidCity',
    };

    expect(() => new BranchLocationValueObject(invalidLocation)).toThrowError(
      'Location Country must be at least 3 characters',
    );
  });

  it('should throw an error when city is too short', () => {
    const invalidLocation = {
      country: 'ValidCountry',
      city: 'A',
    };

    expect(() => new BranchLocationValueObject(invalidLocation)).toThrowError(
      'Location City must be at least 3 characters',
    );
  });

  it('should throw an error when country is too long', () => {
    const invalidLocation = {
      country: 'a'.repeat(51),
      city: 'ValidCity',
    };

    expect(() => new BranchLocationValueObject(invalidLocation)).toThrowError(
      'Location Country must be maximum 50 characters',
    );
  });

  it('should throw an error when city is too long', () => {
    const invalidLocation = {
      country: 'ValidCountry',
      city: 'a'.repeat(91),
    };

    expect(() => new BranchLocationValueObject(invalidLocation)).toThrowError(
      'Location City must be maximum 90 characters',
    );
  });
});
