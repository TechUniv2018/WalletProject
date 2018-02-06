const server = require('../../server');

describe('check server response code', () => {
  test('/ping should respond with status code 200', () => {
    server.inject('/ping', (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('check server response message', () => {
  test('/ping should respond message pong', () => {
    server.inject('/ping', (response) => {
      expect(response.result).toBe('pong');
    });
  });
});

