import { ProductNameValueObject } from '../product-name.value-object';

describe('ProductNameValueObject', () => {
  it('should create a valid ProductNameValueObject', () => {
    const validName = 'ValidProductName'; // Modifica según tus necesidades
    const nameValueObject = new ProductNameValueObject(validName);
    expect(nameValueObject).toBeInstanceOf(ProductNameValueObject);
  });

  it('should throw an error when name is too short', () => {
    const invalidName = 'A'; // Modifica según tus necesidades
    expect(() => new ProductNameValueObject(invalidName)).toThrowError(
      'Product Name must be at least 3 characters',
    );
  });

  it('should throw an error when name is too long', () => {
    const invalidName = 'a'.repeat(101); // Modifica según tus necesidades
    expect(() => new ProductNameValueObject(invalidName)).toThrowError(
      'Product Name must be maximum 100 characters',
    );
  });
});
