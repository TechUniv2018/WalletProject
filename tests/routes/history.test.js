const server = require('../../server');

describe('check server response code', () => {
  test('/transactions/history should respond with status code 200 when credentials are provided', (done) => {
    server.inject({
      method: 'GET',
      url: '/transactions/history',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },

    }, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('check server response code', () => {
  test('/transactions/history should respond with status code 401 when credentials are not provided', (done) => {
    server.inject({
      method: 'GET',
      url: '/transactions/history',

    }, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});

describe('check server response message', () => {
  test('/transactions/history should respond with status code 200 when credentials are provided', (done) => {
    server.inject({
      method: 'GET',
      url: '/transactions/history',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },

    }, (response) => {
      expect(response.payload).toBe(200);
      done();
    });
  });
});


// describe('check server response message', () => {
//   test('/ping should respond message pong', (done) => {
//     server.inject('/ping', (response) => {
//       expect(response.result).toBe('pong');
//       done();
//     });
//   });
// });
