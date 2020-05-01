'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const ShowTime = sequelize.define('ShowTime', {
//     startTime: DataTypes.TIME,
//     endTime: DataTypes.TIME
//   }, {});
//   ShowTime.associate = function(models) {
//     // associations can be defined here
//   };
//   return ShowTime;
// };
import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

const ShowTimes = sequelize.define('ShowTimes',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  start:{
    type: Sequelize.STRING
  },
  end:{
    type: Sequelize.STRING
  },
  date:{
    type: Sequelize.STRING
  },
  idFilm:{
    type: Sequelize.INTEGER
  },
  idRoom:{
    type: Sequelize.INTEGER
  }
},{
  timestamps: true,
});
export default ShowTimes;