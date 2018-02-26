const bcrypt = require('bcryptjs');

const hashPassword = (password, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (_, hash) => callback(err, hash));
  });
};

module.exports = hashPassword;
