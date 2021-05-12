'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasOne(models.Tokens, {foreignKey: 'usersId'});
      Users.hasMany(models.Purchasings, {foreignKey: 'buyerId', as: 'buyers'});
      Users.hasMany(models.Items, {foreignKey: 'usersId', as: 'makers'});
      Users.belongsTo(models.Privileges, {foreignKey: 'privilegesId', as: 'privilege'});
    }
  };
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    privilegesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
