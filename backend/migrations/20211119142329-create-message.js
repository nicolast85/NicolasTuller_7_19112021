'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUsers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      like: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      dislike: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      usersLiked: {
        allowNull: true,
        type: Sequelize.STRING
      },
      usersDisliked: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Messages');
  }
};