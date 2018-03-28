

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'transactions',
      'type',
      {
        type: Sequelize.STRING,
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn(
      'transactions',
      'type',
      {
        type: Sequelize.INTEGER,
      },
    );
  },
};
