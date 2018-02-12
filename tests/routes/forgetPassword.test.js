const server = require('../../server');

describe('check for sending OTP', () => {
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

describe('check for verifying OTP', () => {
  test('/verifyOTP should respond with status code 200', (done) => {
    const req = {
      method: 'POST',
      url: '/verifyOTP',
      payload: JSON.stringify({
        userName: 'John_Doe',
        otp: 12345,
      }),
    };
    server.inject(req, (response) => {
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  test('/verifyOTP, sending wrong OTP', (done) => {
    const req = {
      method: 'POST',
      url: '/verifyOTP',
      payload: JSON.stringify({
        userName: 'John_Doe',
        otp: 12345,
      }),
    };
    server.inject(req, (response) => {
      expect(response.result).toBe('OTP is wrong, please try again');
      done();
    });
  });
});
