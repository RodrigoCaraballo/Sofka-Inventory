import { InvoiceNumberValueObject } from '../invoice-number.value-object';

describe('InvoiceNumberValueObject', () => {
  it('should create a valid InvoiceNumberValueObject', () => {
    const validNumber = '12345';

    const numberValueObject = new InvoiceNumberValueObject(validNumber);

    expect(numberValueObject).toBeInstanceOf(InvoiceNumberValueObject);
  });

  it('should throw an error when number is too short', () => {
    const invalidNumber = '';

    expect(() => new InvoiceNumberValueObject(invalidNumber)).toThrowError(
      'Invoice Number must be at least 1 characters',
    );
  });

  it('should throw an error when number is too long', () => {
    const invalidNumber = 'a'.repeat(101);

    expect(() => new InvoiceNumberValueObject(invalidNumber)).toThrowError(
      'Invoice Number must be maximum 100 characters',
    );
  });
});
