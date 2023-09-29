import { BranchNameValueObject } from '../../../../../src/domain/branch/domain/value-object';
import { ValueObjectException } from '../../../../../src/lib/sofka';

describe('Branch Name VO ', () => {
  test('Should return a value object without errores', () => {
    const name = 'Rodrigo';
    const branchLocationVO = new BranchNameValueObject(name);

    expect(branchLocationVO.valueOf()).toBe(name);
  });

  test('Should return an error when name < MIN_EXTENSION', () => {
    const name = 'Ro';

    expect(() => new BranchNameValueObject(name)).toThrowError(
      ValueObjectException,
    );
  });

  test('Should return an error when name < MAX_EXTENSION', () => {
    const name = 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcde';

    expect(() => new BranchNameValueObject(name)).toThrowError(
      ValueObjectException,
    );
  });
});
