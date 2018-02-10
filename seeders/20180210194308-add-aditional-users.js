module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    userId: 2,
    userName: 'Alice_A',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 3,
    userName: 'Bob_B',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
