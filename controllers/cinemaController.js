
import Films from '../models/film';
const functions = {
	index : (req,res)=>{
		//res.send("index");
		res.render('cinemas');
	},
	list : async(req,res)=>{
		try{
			let films = await Films.findAll({
				attributes: ['id','name','code','runTime','status'],
			});
			if (films){
				res.render('cinemas/list',{films:films});
			}else{
				res.send("Khong co phim");
			}
		}catch(error){
			res.json({
				Error: error
			});
		}
		//res.render('cinemas/list.ejs');
	},
	getAdd : async(req,res)=>{
		res.render('cinemas/add.ejs');
	},
	postAdd : async(req,res)=>{
		let {name, code, runtime, genre, director, cast, trailer, openday, country} =req.body;			 
				
		var fposter = null;
		if (typeof(req.file) != 'undefined'){
			//fposter = req.file.originalname;
			fposter = req.file.originalname;
		}
		
				
		try{		
			let afilm = await Films.create({
				name: name ? name : null,
				code: code ? code : null,
				runTime: runtime ? runtime : null,
				genre: genre ? genre : null,
				director: director ? director :null,
				cast: cast ? cast : null,
				trailer: trailer ? trailer : null,
				openDay: openday ? openday : null,
				country: country ? country : null,
				poster: fposter ? fposter : null,
				status:0
			},{
				fields: ['name','code','runTime','genre','director',
							'cast','trailer','openDay','country','poster','status'],
				//fields: [name, code, runtime, genre, director, cast, trailer, openday, country, status],
			});
			if (afilm){
				//res.redirect('back');
				req.session.message = {
					type: 'success',
					message: 'Insert Successfully',
				}
				res.redirect('back');
			}else{
				res.json({
					result:"Faild"
				});
			}
		}catch(error){
			res.json({
				error: error
			});
		}
	},
	delete : async(req,res)=>{
		let id = parseInt(req.params.id);
		//res.send(typeof(id));
		try{
			await Films.destroy({
				where: {
					id: id
				}
			});
			req.session.message = {
					type: 'success',
					message: 'Deleted Successfully',
				}
			res.redirect('/cinemas/list');
		}catch(error){
			res.json({
				error: error
			});	
		}
		res.end();
	}
}

export default functions;