'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Privileges extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Privileges.hasMany(models.Users, {foreignKey: 'privilegesId', as: 'privilege'});
    }
  };
  Privileges.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Privileges',
  });
  return Privileges;
};