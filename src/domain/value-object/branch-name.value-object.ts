import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '@Sofka';

const MIN_EXTENSION = 3;
const MAX_EXTENSION = 100;

export class BranchNameValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.minExtension();
    this.maxExtension();
  }

  minExtension(): void {
    if (this.value.length < MIN_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'BranchName',
        message: `Branch Name must be at least ${MIN_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }

  maxExtension(): void {
    if (this.value.length > MAX_EXTENSION) {
      const error: IErrorValueObject = {
        field: 'BranchName',
        message: `Branch Name must be maximum ${MAX_EXTENSION} characters`,
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
