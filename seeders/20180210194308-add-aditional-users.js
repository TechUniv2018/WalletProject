const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    userId: 2,
    userName: 'Alice_A',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 3,
    userName: 'Bob_B',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    userId: 4,
    userName: 'Rachel',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 5,
    userName: 'Ross',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
