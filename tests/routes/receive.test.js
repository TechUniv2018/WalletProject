const Models = require('../../models');
const server = require('../../server');

describe('url validation', () => {
  test('Responds with 200 status code when provided credentials', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        from: 2,
        amount: 100,
        decision: 'YES',
      },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Responds with 401 status code when no credentials are provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/receive',
      payload: {
        from: 2,
        amount: 100,
        decision: 'YES',
      },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});

describe('request validation', () => {
  test('rejects request if fromId is not provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        amount: 100,
        decision: 'YES',
      },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });

  test('rejects request if amount is not provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        from: 2,
        decision: 'YES',
      },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });

  test('rejects request if user decision is not provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        from: 2,
        amount: 100,
      },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});

describe('functionality tests', () => {
  test('Responds with 200 status code when provided credentials', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        from: 2,
        amount: 100,
        decision: 'YES',
      },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
