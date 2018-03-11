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
  test('/transactions/history should respond with array of transactions', (done) => {
    server.inject({
      method: 'GET',
      url: '/transactions/history',
      credentials: {
        userId: 1,
        userName: 'John_Doe',
      },

    }, (response) => {
      const { history } = JSON.parse(response.payload);
      expect.assertions(history.length * 11);
      history.forEach((transaction) => {
        expect(transaction.transactionId).toBeDefined();
        expect(transaction.fromId).toBeDefined();
        expect(transaction.toId).toBeDefined();
        expect(transaction.fromName).toBeDefined();
        expect(transaction.toName).toBeDefined();
        expect(transaction.amount).toBeDefined();
        expect(transaction.reason).toBeDefined();
        expect(transaction.status).toBeDefined();
        expect(transaction.timeStamp).toBeDefined();
        expect(transaction.category).toBeDefined();
        expect(transaction.type).toBeDefined();
      });
      done();
    });
  });

  test('/transactions/history should respond with transactions with fromId or toId equal to userId', (done) => {
    const userId = 1;

    const isValid = (transaction) => {
      if (transaction.fromId === userId || transaction.toId === userId) {
        return true;
      }
      return false;
    };

    server.inject({
      method: 'GET',
      url: '/transactions/history',
      credentials: {
        userId,
        userName: 'John_Doe',
      },

    }, (response) => {
      const { history } = JSON.parse(response.payload);
      expect.assertions(history.length);
      history.forEach((transaction) => {
        expect(isValid(transaction)).toBe(true);
      });
      done();
    });
  });
});
