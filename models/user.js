'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    idClient: {
      type : DataTypes.INTEGER,
      allowNull : false,
      unique :{
        args : true , msg : 'client id  already in use'
      },
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hash(user.password)
  })
  return User;
};