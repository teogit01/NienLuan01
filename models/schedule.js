'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Schedule = sequelize.define('Schedule', {
//     date: DataTypes.DATE
//   }, {});
//   Schedule.associate = function(models) {
//     // associations can be defined here
//   };
//   return Schedule;
// };
import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';

const Schedules = sequelize.define('schedules',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	date:{
		type: Sequelize.DATE
	}
},{
	timestamps: true,
});
export default Schedules;