'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal_booking: {
        type: Sequelize.STRING
      },
      tanggal_kadaluarsa: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      wa: {
        type: Sequelize.STRING
      },
      nameEvent : {
        type: Sequelize.STRING
      },
      deskripsiEvent : {
        type: Sequelize.STRING
      },
      productId : {
        type : Sequelize.INTEGER,
        references : {
          model : "Products",
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
    await queryInterface.dropTable('Bookings');
  }
};