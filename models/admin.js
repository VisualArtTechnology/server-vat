'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique :{
        args : true , msg : 'email already in use'
      },
      validate : {
        isEmail : {
          msg : 'check for email format'
        },
        notEmpty : {
          msg : 'email is required'
        },
        notNull : {
          msg : 'email is required'
        },
        
      }
    },

    password:{
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : {
          msg : 'password is required'
        },
        notNull: {
          msg : 'password is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.beforeCreate(user => {
    user.password = hash(user.password)
  })
  return Admin;
};