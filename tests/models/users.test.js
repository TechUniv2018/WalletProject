const Models = require('../../models');

describe('users: check if data matches model', () => {
  test('check if returned seeded data matches users model', () => Models.users.findAll().then((result) => {
    expect.assertions(result.length * 3);
    result.forEach((user) => {
      expect(user.userId).toBeDefined();
      expect(user.userName).toBeDefined();
      expect(user.password).toBeDefined();
    });
  }));
});
