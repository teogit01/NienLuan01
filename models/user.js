'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     name: DataTypes.STRING,
//     code: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     email: DataTypes.STRING,
//     birthday: DataTypes.DATE,
//     address: DataTypes.STRING,
//     point: DataTypes.DOUBLE
//   }, {});
//   User.associate = function(models) {
//     // associations can be defined here
//   };
//   return User;
// };
import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

const Users = sequelize.define('Users',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  username:{
    type: Sequelize.STRING
  },
  password:{
    type: Sequelize.STRING
  },
  name:{
    type: Sequelize.STRING
  },
  code:{
    type: Sequelize.STRING
  },
  phone:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  },
  birthday:{
    type: Sequelize.STRING
  },
  address:{
    type: Sequelize.STRING
  },
  point:{
    type: Sequelize.STRING
  }
},{
  timestamps: true,
});

export default Users;