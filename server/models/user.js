'use strict';
const bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.Sequelize.Model
  class User extends models { }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize, hooks: {
      beforeCreate: (user, options) => {
        user.password=bcrypt.hasher(user.password)
      }
    }
  }
  )

  User.associate = function (models) {
    User.hasMany(models.Kanban)
    // associations can be defined here
  };
  return User;
};