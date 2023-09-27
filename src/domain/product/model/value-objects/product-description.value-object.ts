import { IErrorValueObject, ValueObjectBase } from '../.././../../lib/sofka';

export class ProductDescriptionValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 3;
  MAX_EXTENSION = 100;

  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  minExtension(): void {
    if (this.value.length < this.MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'ProductDescription',
        message: `Product Description must be at least ${this.MIN_EXTENSION} characters`,
      };
      this.setError(error);
    }
  }

  maxExtension(): void {
    if (this.value.length > this.MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'ProductDescription',
        message: `Product Description must be maximum ${this.MAX_EXTENSION} characters`,
      };
      this.setError(error);
    }
  }
}
