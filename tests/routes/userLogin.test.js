const server = require('../../server');
const Jwt = require('jsonwebtoken');
const secret = require('../../secret');

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

describe('JWT validation', () => {
  test('request to GET /ping should not require session token', (done) => {
    const options = {
      method: 'GET',
      url: '/ping',
    };

    server.inject(options, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Attempt to access restricted content (without auth token)', (done) => {
    const options = {
      method: 'GET',
      url: '/auth',
    };

    server.inject(options, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });


  test('Attempt to access restricted content (with an INVALID Token)', (done) => {
    const options = {
      method: 'GET',
      url: '/auth',
      headers: { authorization: 'Bearer fails.validation' },
    };

    server.inject(options, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });

  test('Try using an incorrect secret to sign the JWT', (done) => {
    const token = Jwt.sign({ userId: 1, name: 'John_Doe' }, 'incorrectSecret');
    const options = {
      method: 'GET',
      url: '/auth',
      headers: { authorization: token },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });


  test('Simulate Authentication', (done) => {
    const token = Jwt.sign({ userId: 1, name: 'John_Doe' }, secret);
    const options = {
      method: 'GET',
      url: '/auth',
      headers: { authorization: token },
    };
    server.inject(options, (res) => {
      expect(res.statusCode).toBe(200);
      done();
    });
  });


  test('Try using an expired token', (done) => {
    const token = Jwt.sign({ userId: 1, name: 'John_Doe' }, secret, { expiresIn: '1s' });
    const options = {
      method: 'GET',
      url: '/auth',
      headers: { authorization: token },
    };
    setTimeout(() => {
      server.inject(options, (res) => {
        expect(res.statusCode).toBe(401);
        done();
      });
    }, 1100);
  });
});
