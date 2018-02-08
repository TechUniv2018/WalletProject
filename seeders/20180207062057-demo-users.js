module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    userId: 1,
    userName: 'John_Doe',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
