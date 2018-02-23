const validate = require('../validate');

test('validate function should return true if validated', (done) => {
  const call = (_, value) => { expect(value).toBe(true); done(); };
  const decoded = { userId: 2 };
  const request = () => null;
  validate(decoded, request, call);
});

test('validate function should return false if not validated', (done) => {
  const call = (_, value) => { expect(value).toBe(false); done(); };
  const decoded = { userId: 444 };
  const request = () => null;
  validate(decoded, request, call);
});
