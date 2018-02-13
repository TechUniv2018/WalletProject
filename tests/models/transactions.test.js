const Models = require('../../models');

describe('userDetails: check if data matches model', () => {
  test('check if returned seeded data matches users model', () => Models.transactions.findAll().then((result) => {
    expect.assertions(result.length * 9);
    result.forEach((transaction) => {
      expect(transaction.transactionId).toBeDefined();
      expect(transaction.fromId).toBeDefined();
      expect(transaction.toId).toBeDefined();
      expect(transaction.amount).toBeDefined();
      expect(transaction.reason).toBeDefined();
      expect(transaction.status).toBeDefined();
      expect(transaction.timeStamp).toBeDefined();
      expect(transaction.category).toBeDefined();
      expect(transaction.type).toBeDefined();
    });
  }));
});
