const Models = require('../../models');

describe('userDetails: check if data matches model', () => {
  test('check if returned seeded data matches users model', () => Models.userDetails.findAll().then((result) => {
    expect.assertions(result.length * 6);
    result.forEach((user) => {
      expect(user.userId).toBeDefined();
      expect(user.image).toBeDefined();
      expect(user.aadharNo).toBeDefined();
      expect(user.phone).toBeDefined();
      expect(user.accountNo).toBeDefined();
      expect(user.balance).toBeDefined();
    });
  }));
});

describe('userDetails: check size of seeded table', () => {
  test('check if seeded userDetails table has size 1', () => {
    expect.assertions(1);
    return Models.userDetails.findAll().then((result) => {
      expect(result.length).toBe(1);
    });
  });
});

