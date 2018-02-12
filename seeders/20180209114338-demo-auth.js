

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('auths', [{
    token: 'fd4ab3bca93f37d097252d290d8d0730',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('auths', null, {}),
};
