module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('userDetails', [{
    userId: 2,
    phone: '1234567890',
    accountNo: '0987654321',
    firstName: 'Alice',
    lastName: 'A',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    userId: 3,
    phone: '1234567890',
    accountNo: '0987654321',
    firstName: 'Bob',
    lastName: 'B',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('userDetails', null, {}),
};
