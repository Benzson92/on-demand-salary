import getAxiosRequestConfigByToken from '../getAxiosRequestConfigByToken';

describe('getAxiosRequestConfigByToken', () => {
  test('returns an object with Authorization header set to the token', () => {
    const token = 'my-token';
    const expected = {
      headers: {
        Authorization: 'Bearer my-token',
      },
    };
    const result = getAxiosRequestConfigByToken(token);
    expect(result).toEqual(expected);
  });

  test('returns an empty object if no token is provided', () => {
    const expected = {};
    const result = getAxiosRequestConfigByToken('');
    expect(result).toEqual(expected);
  });
});
