'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.categoryProduct)
      Product.hasMany(models.Booking)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    categoryProductId: DataTypes.INTEGER,
    imgProduct: DataTypes.STRING,
    projectResults: DataTypes.STRING,
    status : DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};