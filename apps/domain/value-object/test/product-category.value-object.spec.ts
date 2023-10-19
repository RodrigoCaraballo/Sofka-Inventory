import {
  CATEGORY_ENUM,
  ProductCategoryValueObject,
} from '../product-category.value-object';

describe('ProductCategoryValueObject', () => {
  it('should create a valid ProductCategoryValueObject', () => {
    const validCategory = CATEGORY_ENUM.Hand_Tools;
    const categoryValueObject = new ProductCategoryValueObject(validCategory);
    expect(categoryValueObject).toBeInstanceOf(ProductCategoryValueObject);
  });

  it('should throw an error for an invalid category', () => {
    const invalidCategory = 'Invalid_Category';
    expect(() => new ProductCategoryValueObject(invalidCategory)).toThrowError(
      'Product Category is not a valid value',
    );
  });
});
