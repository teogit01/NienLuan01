import Rooms from '../models/room'
import Schedules from '../models/schedule'
function index(req,res){
	res.render('cinemas/');
}
function index2(req,res){
	res.render("test/index2");
}

function addRoom(req,res){
	res.send("<form action'addRoom' method='post'>ADDRoom</button></form>")
}
async function postaddRoom(req,res){
	
	for (let i = 2; i<=5; i++){
		var room = await Rooms.create({
			name: "Cinema"+i
		},{
			fields: ['name'],
		})
	}
	//console.log(room)
	res.send("SUCCESSFULLY")

}
async function addSchedule(req,res){
	res.send("<form action'addschedule' method='post'><input type='date'><button>ADDSCHEULE</button></form>")
}
async function postaddSchedule(req,res){

	let date = '22/03/2020'
	// let day = 'Saturday'
	// for(let i=23; i<=31; i++){
	// 	let aday = await Schedules.create({
	// 		date:i+'/'+'03/2020',
	// 		day:'a'
	// 	},{
	// 		fields: ['date','day']
	// 	})
	// }
	let aday = await Schedules.create({
		date:'31/03/2020',
			day:'Tuesday'
		},{
			fields: ['date','day']
		})
	
	res.send("SUCCESSFULLY")		
}

export default {index,index2,addRoom,postaddRoom,addSchedule,postaddSchedule};
