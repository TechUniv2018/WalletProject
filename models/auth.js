'use strict';
module.exports = (sequelize, DataTypes) => {
  var auth = sequelize.define('auth', {
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return auth;
};