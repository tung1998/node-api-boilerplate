'use strict';

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    pass: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return User;
};
