

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'transactions',
      'transactionId',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'transactions',
      'transactionId',
      {
        type: Sequelize.STRING,
      },
    );
  },
};
