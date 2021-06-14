'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Orders.belongsTo(models.Users, {
        foreignKey: 'buyerId',
        as: 'buyer',
      });
    }
  }
  Orders.init(
    {
      codeOrder: DataTypes.STRING,
      buyerId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      isPayment: DataTypes.BOOLEAN,
      isFulfillment: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Orders',
    }
  );
  return Orders;
};
