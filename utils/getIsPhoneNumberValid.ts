const phoneNumberRegex = /^0\d{9}$/;

const getIsPhoneNumberValid = (phoneNumber: string) => {
  return phoneNumberRegex.test(phoneNumber);
};

export default getIsPhoneNumberValid;
