'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Room = sequelize.define('Room', {
//     name: DataTypes.STRING,
//     freeTime: DataTypes.TIME
//   }, {});
//   Room.associate = function(models) {
//     // associations can be defined here
//   };
//   return Room;
// };
import Sequelize from 'sequelize';
import { sequelize } from '../databases/database';
const Rooms = sequelize.define('Rooms',{
	id:{
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name:{
		type: Sequelize.STRING
	}
},{
	timestamps: true,
});
export default Rooms