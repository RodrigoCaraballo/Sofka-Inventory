import { ProductInventoryStockValueObject } from '../product-inventory-stock.value-object';

describe('ProductInventoryStockValueObject', () => {
  it('should create a valid ProductInventoryStockValueObject', () => {
    const validStock = 10;
    const stockValueObject = new ProductInventoryStockValueObject(validStock);
    expect(stockValueObject).toBeInstanceOf(ProductInventoryStockValueObject);
  });

  it('should throw an error when stock is less than the minimum value', () => {
    const invalidStock = -1;
    expect(
      () => new ProductInventoryStockValueObject(invalidStock),
    ).toThrowError('Product Inventory Stock must be greater than 0');
  });
});
