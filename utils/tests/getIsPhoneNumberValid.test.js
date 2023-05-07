import getIsPhoneNumberValid from '../getIsPhoneNumberValid';

describe('getIsPhoneNumberValid', () => {
  it('should return true for valid phone number', () => {
    const phoneNumber = '0123456789';
    const result = getIsPhoneNumberValid(phoneNumber);
    expect(result).toBe(true);
  });

  it('should return false for phone number without leading zero', () => {
    const phoneNumber = '1234567890';
    const result = getIsPhoneNumberValid(phoneNumber);
    expect(result).toBe(false);
  });

  it('should return false for phone number with less than 10 digits', () => {
    const phoneNumber = '012345678';
    const result = getIsPhoneNumberValid(phoneNumber);
    expect(result).toBe(false);
  });

  it('should return false for phone number with more than 10 digits', () => {
    const phoneNumber = '01234567890';
    const result = getIsPhoneNumberValid(phoneNumber);
    expect(result).toBe(false);
  });

  it('should return false for phone number with non-numeric characters', () => {
    const phoneNumber = '0abc123456';
    const result = getIsPhoneNumberValid(phoneNumber);
    expect(result).toBe(false);
  });
});
