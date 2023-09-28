import {
  IErrorValueObject,
  ValueObjectBase,
  ValueObjectException,
} from '../../../../lib/sofka';

const REGEX_UUID =
  '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i';

export class UUIDValueObject extends ValueObjectBase<string> {
  validateData(): void {}

  isUUID(): void {
    if (this.value.match(REGEX_UUID)) {
      const error: IErrorValueObject = {
        field: 'Id',
        message: 'Invalid UUID',
      };
      throw new ValueObjectException(error.message, [error]);
    }
  }
}
