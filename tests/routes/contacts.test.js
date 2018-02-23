const server = require('../../server');
const Jwt = require('jsonwebtoken');
const secret = require('../../secret');

const userId = 1;
const userName = 'John_Doe';

describe('GET contacts list', () => {
  test('should get 401 status code if passed without auth', (done) => {
    const request = {
      method: 'GET',
      url: '/contacts',
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(401);
      done();
    });
  });

  test('should get 200 status code if passed with auth', (done) => {
    const request = {
      method: 'GET',
      url: '/contacts',
      credentials: { userId, userName },
    };
    server.inject(request, (reply) => {
      expect(reply.statusCode).toEqual(200);
      done();
    });
  });

  test('should get array of objects on success', (done) => {
    const request = {
      method: 'GET',
      url: '/contacts',
      credentials: { userId, userName },
    };
    server.inject(request, (reply) => {
      expect.assertions(3);
      expect(reply.result).toBeInstanceOf(Array);
      expect(reply.result[0]).toHaveProperty('id');
      expect(reply.result[0]).toHaveProperty('name');
      done();
    });
  });
});

