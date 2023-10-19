import { UUIDValueObject } from '../uuid.value-object';

describe('UUIDValueObject', () => {
  it('should create a valid UUIDValueObject', () => {
    const validUUID = '550e8400-e29b-41d4-a716-446655440000'; // Modifica según tus necesidades
    const uuidValueObject = new UUIDValueObject(validUUID);
    expect(uuidValueObject).toBeInstanceOf(UUIDValueObject);
  });

  it('should throw an error when UUID is not in a valid format', () => {
    const invalidUUID = 'invalid-uuid'; // Modifica según tus necesidades
    expect(() => new UUIDValueObject(invalidUUID)).toThrowError('Invalid UUID');
  });
});
