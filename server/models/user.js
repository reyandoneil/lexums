'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
const { hashPassword } = require('../utils/bcrypt')
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
  };
  User.init({
    // id: DataTypes.UUID4(),
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4() },
    user_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    verfy_phone_number: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    email_verfy_code:DataTypes.STRING,
    email_verfy_status: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    password: DataTypes.STRING,

  }, {
    hooks: {
      beforeCreate(user) {
        if (user.password) {
          user.password = hashPassword(user.password)
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};