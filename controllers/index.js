import Rooms from '../models/room'
function index(req,res){
	res.render('cinemas/');
}
function index2(req,res){
	res.render("test/index2");
}

function addRoom(req,res){
	res.send("<form action'addRoom' method='post'><button>ADDRoom</button></form>")
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

export default {index,index2,addRoom,postaddRoom};
