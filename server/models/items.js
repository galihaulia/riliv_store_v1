'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Items.belongsTo(models.Users, {foreignKey: 'usersId', as: 'user'});
    }
  };
  Items.init({
    usersId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};