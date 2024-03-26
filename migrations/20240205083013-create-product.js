'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT
      },
      categoryProductId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'categoryProducts',
          key : 'id'
        },
        onDelete : 'cascade',
        onUpdate : 'cascade'
      },
      status :  {
        type : Sequelize.STRING
      },
      imgProduct: {
        type: Sequelize.STRING
      },
      projectResults: {
        type: Sequelize.STRING
      },
      status : {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};