import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

export class BranchNameValueObject extends ValueObjectBase<string> {
  MIN_EXTENSION = 3;
  MAX_EXTENSION = 40;

  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  minExtension(): void {
    if (this.value.length < this.MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'BranchName',
        message: `Branch Name must be at least ${this.MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxExtension(): void {
    if (this.value.length > this.MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'BranchName',
        message: `Branch Name must be maximum ${this.MAX_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
