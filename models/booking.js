'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Product)
    }
  }
  Booking.init({
    tanggal_booking: DataTypes.STRING,
    tanggal_kadaluarsa: DataTypes.STRING,
    status: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    wa: DataTypes.STRING,
    productId : DataTypes.INTEGER,
    nameEvent : DataTypes.STRING,
    deskripsiEvent : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};