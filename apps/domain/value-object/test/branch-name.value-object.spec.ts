import { BranchNameValueObject } from '../branch-name.value-object';

describe('BranchNameValueObject', () => {
  it('should create a valid BranchNameValueObject', () => {
    const validName = 'ValidBranchName';

    const nameValueObject = new BranchNameValueObject(validName);

    expect(nameValueObject).toBeInstanceOf(BranchNameValueObject);
  });

  it('should throw an error when name is too short', () => {
    const invalidName = 'A';

    expect(() => new BranchNameValueObject(invalidName)).toThrowError(
      'Branch Name must be at least 3 characters',
    );
  });

  it('should throw an error when name is too long', () => {
    const invalidName = 'a'.repeat(101);

    expect(() => new BranchNameValueObject(invalidName)).toThrowError(
      'Branch Name must be maximum 100 characters',
    );
  });
});
