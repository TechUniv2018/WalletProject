const Models = require('../../models');

describe('Auths: check if data matches model', () => {
  test('check if returned seeded data matches users model', () => Models.auths.findAll().then((result) => {
    expect.assertions(result.length);
    result.forEach((entry) => {
      expect(entry.token).toBeDefined();
    });
  }));
});

describe('Auths: check size of seeded table', () => {
  test('check if seeded auths table has size 1', () => {
    expect.assertions(1);
    return Models.auths.findAll().then((result) => {
      expect(result.length).toBe(1);
    });
  });
});
