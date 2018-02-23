module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    transactionId: DataTypes.INTEGER,
    fromId: DataTypes.INTEGER,
    toId: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    reason: DataTypes.STRING,
    status: DataTypes.STRING,
    timeStamp: DataTypes.DATE,
    category: DataTypes.STRING,
    type: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return transactions;
};
