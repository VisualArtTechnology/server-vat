'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimoni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Testimoni.belongsTo(models.Portofolio)
    }
  }
  Testimoni.init({
    name: DataTypes.STRING,
    testimoni: DataTypes.STRING,
    avatar: DataTypes.STRING,
    portofolioId: DataTypes.INTEGER,
    approved : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Testimoni',
  });
  return Testimoni;
};