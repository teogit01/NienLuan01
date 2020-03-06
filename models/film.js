'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Film = sequelize.define('Film', {
//     name: DataTypes.STRING,
//     code: DataTypes.STRING,
//     runtime: DataTypes.INTEGER,
//     genre: DataTypes.STRING,
//     director: DataTypes.STRING,
//     cast: DataTypes.STRING,
//     trailer: DataTypes.STRING,
//     openDay: DataTypes.DATE,
//     poster: DataTypes.STRING,
//     country: DataTypes.STRING,
//     status: DataTypes.INTEGER
//   }, {});
//   Film.associate = function(models) {
//     // associations can be defined here
//   };
//   return Film;
// };
import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';
const Films = sequelize.define('Films',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING
  },
  code:{
    type: Sequelize.STRING
  },
  runTime:{
    type: Sequelize.INTEGER
  },
  genre:{
    type: Sequelize.STRING
  },
  director:{
    type: Sequelize.STRING
  },
  cast:{
    type: Sequelize.STRING
  },
  trailer:{
    type: Sequelize.STRING
  },
  openDay:{
    type: Sequelize.DATE
  },
  poster:{
    type: Sequelize.STRING
  },
  country:{
    type: Sequelize.STRING
  },
  status:{
    type: Sequelize.INTEGER
  }
},{
  timestamps: true,
});
export default Films;