const time = Date.now();
const strTime = time.toString();

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('forgotpasswords', [{
    userId: 100,
    otp: 100,
    timestamp: strTime,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('forgotpasswords', null, {}),
};
