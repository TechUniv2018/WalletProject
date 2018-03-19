
module.exports = (sequelize, DataTypes) => {
  const forgotpasswords = sequelize.define('forgotpasswords', {
    userId: DataTypes.INTEGER,
    otp: DataTypes.INTEGER,
    timestamp: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return forgotpasswords;
};
