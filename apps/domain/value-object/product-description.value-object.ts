import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../lib';

const MIN_EXTENSION = 3;
const MAX_EXTENSION = 256;

export class ProductDescriptionValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  minExtension(): void {
    if (this.value.length < MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'ProductDescription',
        message: `Product Description must be at least ${MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxExtension(): void {
    if (this.value.length > MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'ProductDescription',
        message: `Product Description must be maximum ${MAX_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
