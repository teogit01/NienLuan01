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
const Seats = sequelize.define('seats',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name:{
		type: Sequelize.ENUM('row','column')
	},
	status:{
		type: Sequelize.STRING
	}
},{
	timestamps: true,
});
export default Seats;