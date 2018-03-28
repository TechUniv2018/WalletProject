

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('transactions', 'unseen', Sequelize.BOOLEAN);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('transactions', 'unseen');
  },
};
