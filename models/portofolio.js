'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portofolio.belongsTo(models.categoryPortofolio)
      Portofolio.hasMany(models.Testimoni)
    }
  }
  Portofolio.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    details: DataTypes.TEXT,
    title: DataTypes.STRING,
    categoryPortofolioId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portofolio',
  });
  return Portofolio;
};