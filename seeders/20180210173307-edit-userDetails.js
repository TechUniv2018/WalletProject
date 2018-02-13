module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkUpdate(
      'userDetails',
      { firstName: 'john', lastName: 'doe' },
      { userId: 1 },
    );
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('userDetails', null, {}),

};
