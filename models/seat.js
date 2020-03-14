'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Seat = sequelize.define('Seat', {
//     name: DataTypes.ENUM,
//     status: DataTypes.INTEGER
//   }, {});
//   Seat.associate = function(models) {
//     // associations can be defined here
//   };
//   return Seat;
// };
import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';
const Seats = sequelize.define('Seats',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING
  },
  row:{
    type: Sequelize.STRING
  },
  column:{
    type: Sequelize.STRING
  },
  status:{
    type: Sequelize.STRING
  }
},{
  timestamps: true,
});
export default Seats;