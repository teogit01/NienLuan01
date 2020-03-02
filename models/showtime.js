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

const ShowTimes = sequelize.define('showTimes',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	startTime:{
		type: Sequelize.TIME
	},
	endTime:{
		type: Sequelize.TIME
	}
},{
	timestamps:true,
});
export default ShowTimes;