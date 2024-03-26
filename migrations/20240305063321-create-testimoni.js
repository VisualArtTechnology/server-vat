'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Testimonis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      testimoni: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      portofolioId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Portofolios',
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
    await queryInterface.dropTable('Testimonis');
  }
};