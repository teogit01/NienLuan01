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

const Schedules = sequelize.define('Schedules',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	date:{
		type: Sequelize.STRING
	},
	day:{
		type: Sequelize.INTEGER
	}
},{
	timestamps: true,
});
export default Schedules;