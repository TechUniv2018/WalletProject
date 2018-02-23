const server = require('../../server');

describe('request validation', () => {
  test('Test for successful POST request', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/request',
      credentials: {
        userId: 4,
      },
      payload: JSON.stringify({ toId: 2, amount: 500, reason: 'food' }),
    };
    server.inject(request, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });

  test('Test for unsuccessful POST request if toId is not a number', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/request',
      credentials: {
        userId: 4,
      },
      payload: JSON.stringify({ toId: 'm', amount: 500, reason: 'food' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
  test('Test for unsuccessful POST request if amount is not a number', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/request',
      credentials: {
        userId: 4,
      },
      payload: JSON.stringify({ toId: 2, amount: '500m', reason: 'food' }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });


  test('Test for unsuccessful POST request if reason is not a string', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/request',
      credentials: {
        userId: 4,
      },
      payload: JSON.stringify({ toId: 2, amount: 500, reason: 22 }),
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});
