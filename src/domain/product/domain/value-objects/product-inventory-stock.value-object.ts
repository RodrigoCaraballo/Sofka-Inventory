import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

const MIN_VALUE = 0;

export class ProductInventoryStockValueObject extends ValueObjectBase<number> {
  validateData(): void {
    this.minValue();
  }

  minValue(): void {
    if (this.value < MIN_VALUE) {
      const error: IErrorValueObject = {
        field: 'ProductInventoryStock',
        message: `Product Inventory Stock must be greater than ${MIN_VALUE}`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
