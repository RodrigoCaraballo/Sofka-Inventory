import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

export class ProductPriceValueObject extends ValueObjectBase<number> {
  MIN_VALUE = 0;

  validateData(): void {
    this.minValue();
  }

  minValue(): void {
    if (this.value < this.MIN_VALUE) {
      const error: IErrorValueObject = {
        field: 'ProductPrice',
        message: `Product Price must be greater than ${this.MIN_VALUE}`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
