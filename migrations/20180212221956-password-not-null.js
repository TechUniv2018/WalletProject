

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'password', { type: Sequelize.STRING, allowNull: false });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'password', { type: Sequelize.STRING, allowNull: true });
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
