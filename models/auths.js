

module.exports = (sequelize, DataTypes) => {
  const auths = sequelize.define('auths', {
    token: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return auths;
};
