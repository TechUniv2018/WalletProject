module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: DataTypes.STRING,
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return users;
};
