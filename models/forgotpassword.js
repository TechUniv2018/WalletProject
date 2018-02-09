'use strict';
module.exports = (sequelize, DataTypes) => {
  var forgotpassword = sequelize.define('forgotpassword', {
    userId: DataTypes.INTEGER,
    otp: DataTypes.INTEGER,
    timestamp: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return forgotpassword;
};