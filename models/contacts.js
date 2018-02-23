'use strict';
module.exports = (sequelize, DataTypes) => {
  var contacts = sequelize.define('contacts', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {});
  contacts.associate = function(models) {
    // associations can be defined here
  };
  return contacts;
};