module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('userDetails', [{
    userId: 1,
    phone: '1234567890',
    accountNo: '0987654321',
    balance: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('userDetails', null, {}),
};
