module.exports = (sequelize, DataTypes) => {
  const userDetails = sequelize.define('userDetails', {
    userId: DataTypes.INTEGER,
    image: DataTypes.BLOB,
    aadharNo: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    accountNo: DataTypes.STRING,
    balance: DataTypes.FLOAT,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return userDetails;
};
