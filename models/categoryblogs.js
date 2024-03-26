'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoryBlogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categoryBlogs.hasMany(models.Blogs)
      
    }
  }
  categoryBlogs.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categoryBlogs',
  });
  return categoryBlogs;
};