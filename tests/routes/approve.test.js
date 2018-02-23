const Models = require('../../models');
const server = require('../../server');

describe('url validation', () => {
  test('Responds with 200 status code when provided credentials', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/approve',
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
      url: '/transactions/approve',
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
  test('rejects request if from is not provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/approve',
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
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('rejects request if amount is not provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/approve',
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
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('rejects request if user decision is not provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/approve',
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
      expect(response.statusCode).toBe(400);
      done();
    });
  });
});

describe('functionality tests', () => {
  test('Updates status when transaction is completed', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/approve',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        from: 3,
        amount: 100,
        decision: 'YES',
      },
    };
    server.inject(request, () => {
      Models.transactions.findOne({ where: { fromId: 3, toId: 1 } })
        .then((row) => {
          expect(row.status).toEqual('COMPLETED');
          done();
        });
    });
  });

  test('Transaction is approved but user has insufficient balance', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/approve',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        from: 2,
        amount: 1000,
        decision: 'NO',
      },
    };
    server.inject(request, () => {
      Models.transactions.findOne({ where: { fromId: 2, toId: 1 } })
        .then((row) => {
          expect(row.status).toEqual('FAILED');
          done();
        });
    });
  });

  test('Updates status when transaction is failed', (done) => {
    const request = {
      method: 'POST',
      url: '/transactions/approve',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        from: 2,
        amount: 100,
        decision: 'NO',
      },
    };
    server.inject(request, () => {
      Models.transactions.findOne({ where: { fromId: 2, toId: 1 } })
        .then((row) => {
          expect(row.status).toEqual('FAILED');
          done();
        });
    });
  });
});
