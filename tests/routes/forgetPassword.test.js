const server = require('../../server');

describe('check server response code', () => {
  test('/forgetPassword should respond with status code 200', (done) => {
    const req = {
      method: 'POST',
      url: '/forgetPassword',
      payload: JSON.stringify({ username: 'John_Doe' }),
    };
    server.inject(req, (response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });
});

describe('check server response message', () => {
  test('/forgetPassword, OTP sent on mobile', (done) => {
    const req = {
      method: 'POST',
      url: '/forgetPassword',
      payload: JSON.stringify({ username: 'John_Doe' }),
    };
    server.inject(req, (response) => {
      expect(response.result).toBe('OTP sent on registered mobile');
      done();
    });
  });
});
