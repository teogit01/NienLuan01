
import Films from '../models/film';
const functions = {
	index : (req,res)=>{
		res.render('showtimes/index');
	},
	getAdd : (req,res)=>{
		res.render('showtimes/add');
	},
	postSearch : async(req,res)=>{
		//tim tat ca cac name co trong database

		var names = await Films.findAll({
			attributes: ['id','name'],
		});
		//var fname = req.body.name;
		//names.forEach(item => console.log(item.get({plain: true})))
		// var find = names.filter(function(item){
		// 	//name.get({plain: true});
		// 	return item.name.toLowerCase().indexOf(fname) !== -1;
		// });

		// var t = [{name:'Joker',id:'1'}];
		// console.log(t);

		// var tim = t.filter(function(item){
		// 	return item.name.indexOf(fname) !== -1;
		// })
		//console.log(tim.name);
		//tim.forEach(item => console.log(item.name));
		//find.forEach(item => console.log(item.name));
		res.send(names);

		//nhan name tu ajax

		//truyen tro lai ajax
	},

	// Set date
	getDay : async(req,res)=>{
		res.send(req.body.current_day)
	}
}
export default functions;