import { IErrorValueObject, ValueObjectBase } from '../../../lib/sofka';

export class UUIDValueObject extends ValueObjectBase<string> {
  REGEX_UUID =
    '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i';

  validateData(): void {}

  isUUID(): void {
    if (this.value.match(this.REGEX_UUID)) {
      const error: IErrorValueObject = {
        field: 'Id',
        message: 'Invalid UUID',
      };
    }
  }
}
