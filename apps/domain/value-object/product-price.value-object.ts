import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../lib';

const MIN_VALUE = 1;

export class ProductPriceValueObject extends ValueObjectBase<number> {
  validateData(): void {
    this.minValue();
  }

  minValue(): void {
    if (this.value < MIN_VALUE) {
      const error: IErrorValueObject = {
        field: 'ProductPrice',
        message: `Product Price must be greater than ${MIN_VALUE}`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
