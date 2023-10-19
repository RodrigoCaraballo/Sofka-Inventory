import { ProductDescriptionValueObject } from '../product-description.value-object';

describe('ProductDescriptionValueObject', () => {
  it('should create a valid ProductDescriptionValueObject', () => {
    const validDescription = 'Valid product description'; // Modifica según tus necesidades
    const descriptionValueObject = new ProductDescriptionValueObject(
      validDescription,
    );
    expect(descriptionValueObject).toBeInstanceOf(
      ProductDescriptionValueObject,
    );
  });

  it('should throw an error when description is too short', () => {
    const invalidDescription = 'A'; // Modifica según tus necesidades
    expect(
      () => new ProductDescriptionValueObject(invalidDescription),
    ).toThrowError('Product Description must be at least 3 characters');
  });

  it('should throw an error when description is too long', () => {
    const invalidDescription = 'a'.repeat(257); // Modifica según tus necesidades
    expect(
      () => new ProductDescriptionValueObject(invalidDescription),
    ).toThrowError('Product Description must be maximum 256 characters');
  });
});
