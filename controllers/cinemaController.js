
import Films from '../models/film';
import ShowTimes from '../models/showtime';
const functions = {
	index : (req,res)=>{
		//res.send("index");
		res.render('cinemas');
	},
	list : async(req,res)=>{

		let film = await Films.findAll({
			raw:false,
			where :{
				id:1
			},
			include:{
				model: ShowTimes,
				as:'showtime',
				required: false,
				attributes:['id']
			}
		})
		//console.log(film[0].get({plain: true}).showtime[0].id)
		//console.log(film[0].ShowTimes.id)
		//return 
		try{
			let films = await Films.findAll({
				order: [
					['id','ASC']
				]
			},{
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
				status: 0,
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
	},
	getEdit : async(req,res)=>{
		let id = parseInt(req.params.id);
		try{
			const afilm = await Films.findAll({
				where: {
					id: id
				},
				attributes: ['id','name','code','runTime','genre','director',
					'status','cast','trailer','openDay','country','poster'],
			});
			if (afilm){
				res.render('cinemas/edit',{afilm:afilm});
			} else {
				res.send('falid');
			}
		}catch(error){
			res.json({
				err: error
			});
		}
		//res.render('cinemas/edit');
	},
	postEdit : async(req,res)=>{
		let id = req.params.id;
		var status = req.body.status;
		let {name, code, runtime, genre, director, cast, openday, country} = req.body;
		
		var fposter = null;
		if (typeof(req.file) != 'undefined'){
			//fposter = req.file.originalname;
			fposter = req.file.originalname;
		}
		try {
			let afilm = await Films.findAll({
				attributes :['id','name'],
					where: {
						id
					}
			});		
			if (afilm.length > 0 ) {
				afilm.forEach(async (item) => {
					await item.update({
						name: name ? name : item.name,
						code: code ? code : item.code,
						runTime: runtime ? runtime : item.runTime,
						genre: genre ? genre : item.genre,
						director: director ? director : item.director,
						cast: cast ? cast : item.cast,
						openDay: openday ? openday : item.openday,
						country: country ? country : item.country,
						poster: fposter ? fposter : item.poster,
						status:  status ? status : item.status,
					});
				});
			}
			// res.send(afilm);
			// res.end();
			
			req.session.message = {
				type: 'success',
				message: 'Updated Successfully!',
			};
			res.redirect('back');
		} catch (error) {
			res.send(error);
		}
	}
}

export default functions;