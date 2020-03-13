'use strict';
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.Sequelize.Model

  class Kanban extends models{

  }
  Kanban.init(
    {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.STRING,
    status:DataTypes.STRING
    }, {sequelize})
  Kanban.associate = function(models) {
    Kanban.belongsTo(models.User)
    // associations can be defined here
  };
  return Kanban;
};