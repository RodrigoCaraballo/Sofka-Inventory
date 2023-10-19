import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../lib';

const REGEX_UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89aAbB][0-9a-f]{3}-[0-9a-f]{12}$/;

export class UUIDValueObject extends ValueObjectBase<string> {
  validateData(): void {
    this.isUUID();
  }

  isUUID(): void {
    if (!REGEX_UUID.test(this.value) || this.value.length !== 36) {
      const error: IErrorValueObject = {
        field: 'Id',
        message: 'Invalid UUID',
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
