import { ProductPriceValueObject } from '../product-price.value-object';

describe('ProductPriceValueObject', () => {
  it('should create a valid ProductPriceValueObject', () => {
    const validPrice = 10;
    const priceValueObject = new ProductPriceValueObject(validPrice);
    expect(priceValueObject).toBeInstanceOf(ProductPriceValueObject);
  });

  it('should throw an error when price is less than the minimum value', () => {
    const invalidPrice = -1;
    expect(() => new ProductPriceValueObject(invalidPrice)).toThrowError(
      'Product Price must be greater than 1',
    );
  });
});
