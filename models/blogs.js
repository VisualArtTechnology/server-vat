'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blogs.belongsTo(models.categoryBlogs)
    }
  }
  Blogs.init({
    name: DataTypes.STRING,
    details: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryBlogId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Blogs',
  });
  return Blogs;
};