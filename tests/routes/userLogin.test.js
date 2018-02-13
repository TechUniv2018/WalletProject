const server = require('../../server');

describe('request validation', () => {
  test('Test for unsuccessful POST request because username length must be atleat 5 char', (done) => {
    const request = {
      method: 'POST',
      url: '/users/login',
      payload: JSON.stringify({ userName: '90m', password: 'ngvwcmlve' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because username length must be atmost 15 char', (done) => {
    const request = {
      method: 'POST',
      url: '/users/login',
      payload: JSON.stringify({ userName: 'abcd efghijklmnopqrstuv', password: 'ngvwcmlve' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because password length must be atleast 4 char', (done) => {
    const request = {
      method: 'POST',
      url: '/users/login',
      payload: JSON.stringify({ userName: 'abcdefghijklmnopqrstuv', password: 'ng' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Test for unsuccessful POST request because password length must be atmost 20 char', (done) => {
    const request = {
      method: 'POST',
      url: '/users/login',
      payload: JSON.stringify({ userName: 'abcdefghijklmnopqrstuv', password: 'nghjkjtdvhgfty123456#@cfyvlubnmnjbhvcfg' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});

describe('User authentication', () => {
  test('should return error if invalid username', (done) => {
    const request = {
      method: 'POST',
      url: '/users/login',
      payload: JSON.stringify({ userName: 'John_Does', password: 'passsword!' }),
    };

    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('should return error if invalid password', (done) => {
    const request = {
      method: 'POST',
      url: '/users/login',
      payload: JSON.stringify({ userName: 'John_Doe', password: 'passsword!' }),
    };

    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('should return token if valid username and password', (done) => {
    const request = {
      method: 'POST',
      url: '/users/login',
      payload: JSON.stringify({ userName: 'John_Doe', password: 'password' }),
    };

    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
