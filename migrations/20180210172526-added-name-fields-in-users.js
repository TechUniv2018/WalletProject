module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'userDetails',
      'firstName',
      Sequelize.STRING,
    );
    queryInterface.addColumn(
      'userDetails',
      'lastName',
      Sequelize.STRING,
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'userDetails',
      'firstName',
    );
    queryInterface.removeColumn(
      'userDetails',
      'lastName',
    );
  },
};
