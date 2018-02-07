const server = require('../../server');

describe('check server response code', () => {
  test('Test for successful POST request reply code from the server', (done) => {
    const request = {
      method: 'POST',
      url: '/login/validation',
      payload: JSON.stringify({ username: 'Margi_1013', password: '3ngv4@-_cmlve' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Test for unsuccessful POST request because username length must be atleat 5 char', (done) => {
    const request = {
      method: 'POST',
      url: '/login/validation',
      payload: JSON.stringify({ username: '90m', password: 'ngvwcmlve' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because username length must be atmost 15 char', (done) => {
    const request = {
      method: 'POST',
      url: '/login/validation',
      payload: JSON.stringify({ username: 'abcd efghijklmnopqrstuv', password: 'ngvwcmlve' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because password length must be atleast 4 char', (done) => {
    const request = {
      method: 'POST',
      url: '/login/validation',
      payload: JSON.stringify({ username: 'abcdefghijklmnopqrstuv', password: 'ng' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because password length must be atmost 20 char', (done) => {
    const request = {
      method: 'POST',
      url: '/login/validation',
      payload: JSON.stringify({ username: 'abcdefghijklmnopqrstuv', password: 'nghjkjtdvhgfty123456#@cfyvlubnmnjbhvcfg' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
