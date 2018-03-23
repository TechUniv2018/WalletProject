const Models = require('../../models');

describe('forgotpasswords: check if data matches model', () => {
  test('check if returned seeded data matches users model', () => Models.forgotpasswords.findAll().then((result) => {
    expect.assertions(result.length * 3);
    result.forEach((entry) => {
      expect(entry.userId).toBeDefined();
      expect(entry.otp).toBeDefined();
      expect(entry.timestamp).toBeDefined();
    });
  }));
});
