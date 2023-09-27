import { IErrorValueObject, ValueObjectBase } from '../../../../lib/sofka';

export class ProductInventoryStockValueObject extends ValueObjectBase<number> {
  MIN_VALUE = 0;

  validateData(): void {
    this.minValue();
  }

  minValue(): void {
    if (this.value < this.MIN_VALUE) {
      const error: IErrorValueObject = {
        field: 'ProductInventoryStock',
        message: `Product Inventory Stock must be greater than ${this.MIN_VALUE}`,
      };
      this.setError(error);
    }
  }
}
