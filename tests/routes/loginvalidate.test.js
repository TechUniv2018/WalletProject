const server = require('../../server');

describe('check server response code', () => {
  test('Test for successful POST request reply code from the server', (done) => {
    const request = {
      method: 'POST',
      url: '/login/validation',
      payload: JSON.stringify({ username: 'Margi1013' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Test for unsuccessful POST request reply code from the server', (done) => {
    const request = {
      method: 'POST',
      url: '/login/validation',
      payload: JSON.stringify({ username: '90m' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
