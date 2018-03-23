const server = require('../../server');

describe('check server response code', () => {
  test('/transactions/category should respond with status code 200 when credentials are provided with valid payload', (done) => {
    server.inject({
      method: 'PATCH',
      url: '/transactions/category',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        transactionId: '12345',
        category: 'movie',
      },

    }, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('/transactions/category should respond with status code 200 when credentials are provided with valid payload', (done) => {
    server.inject({
      method: 'PATCH',
      url: '/transactions/category',
      credentials: {
        userId: 2,
        userName: 'John_Doe',
      },
      payload: {
        transactionId: '12345',
        category: 'not movie',
      },

    }, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});

