'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchasings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchasings.belongsTo(models.Users, {foreignKey: 'buyerId', as: 'buyer'});
    }
  };
  Purchasings.init({
    codeTransaction: DataTypes.STRING,
    buyerId: DataTypes.INTEGER,
    itemsId: DataTypes.INTEGER,
    itemsName: DataTypes.STRING,
    itemsDesc: DataTypes.STRING,
    price: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Purchasings',
  });
  return Purchasings;
};