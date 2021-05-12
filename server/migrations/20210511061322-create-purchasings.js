'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Purchasings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codeTransaction: {
        allowNull: false,
        type: Sequelize.STRING
      },
      buyerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      itemsId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      itemsName: {
        type: Sequelize.STRING
      },
      itemsDesc: {
        allowNull: true,
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      message: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Purchasings');
  }
};