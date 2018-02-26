

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('userDetails', [{
    userId: 4,
    phone: '1234567890',
    accountNo: '0987654322',
    firstName: 'Rachel',
    lastName: 'A',
    balance: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('userDetails', null, {}),
};
