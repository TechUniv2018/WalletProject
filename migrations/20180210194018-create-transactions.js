

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    transactionId: {
      type: Sequelize.INTEGER,
    },
    fromId: {
      type: Sequelize.INTEGER,
    },
    toId: {
      type: Sequelize.INTEGER,
    },
    amount: {
      type: Sequelize.FLOAT,
    },
    reason: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    timeStamp: {
      type: Sequelize.DATE,
    },
    category: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('transactions'),
};
