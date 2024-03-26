'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Blogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      categoryBlogId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'categoryBlogs',
          key : 'id'
        },
        onDelete : 'cascade',
        onUpdate : 'cascade'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Blogs');
  }
};