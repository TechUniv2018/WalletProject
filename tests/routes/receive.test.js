const Models = require('../../models');
const server = require('../../server');

describe('url validation', () => {
  test('Responds with 200 status code when provided credentials', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/approve',
      credentials: {
        userId: 3,
        userName: 'Bob_B',
      },
      payload: {
        transactionId: 23456,
        decision: 'NO',
      },
    };
    server.inject(request, (response) => {
      // console.log(response.payload);
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('Responds with 401 status code when no credentials are provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/receive',
      payload: {
        transactionId: 23456,
        decision: 'NO',
      },
    };
    server.inject(request, (response) => {
      expect(response.statusCode).toBe(401);
      done();
    });
  });
});

describe('request validation', () => {
  test('rejects request if transactionId is not provided', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        decision: 'NO',
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
      url: '/transaction/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        transactionId: 23456,
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
      url: '/transaction/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        transactionId: 11111,
        decision: 'YES',
      },
    };
    server.inject(request, () => {
      Models.transactions.findOne({ where: { transactionId: request.payload.transactionId } })
        .then((row) => {
          expect(row.status).toEqual('COMPLETED');
          done();
        });
    });
  });

  test('Updates status when transaction is failed', (done) => {
    const request = {
      method: 'POST',
      url: '/transaction/receive',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },
      payload: {
        transactionId: 11212,
        decision: 'NO',
      },
    };
    server.inject(request, () => {
      Models.transactions.findOne({ where: { transactionId: request.payload.transactionId } })
        .then((row) => {
          console.log(row);
          expect(row.status).toEqual('FAILED');
          done();
        });
    });
  });
});
