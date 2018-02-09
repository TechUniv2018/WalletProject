// const time = Date.now();
// const strTime = time.toString();

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('forgotpasswords', [{
    userid: 100,
    otp: 100,
    timestamp: '1518191112247',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('forgotpasswords', null, {}),
};
