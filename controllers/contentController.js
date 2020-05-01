
import Films from '../models/film';
import Rooms from '../models/room';
import ShowTimes from '../models/showtime';
import Schedules from '../models/schedule';
const functions = {
	content : async(req,res)=>{
		//res.send('content')
		var date = req.query.date

		// let today = new Date()
		// let day = today.getDate()
		// if (day<10){
		// 	day = '0'+day
		// }
		// let month = today.getMonth() + 1
		// if (month<10){
		// 	month = '0'+month
		// }
		// let year = today.getFullYear()
		//let date = day+'/'+month+'/'+year
	
		let showtimes = await ShowTimes.findAll({
			raw:false,
			where:{
				date: date
			},
			include:{
				model:Films,
				as:'film',
				required:false
			}
		})
		//console.log(date)
		//console.log(showtimes.length)
		if (showtimes.length > 0){
			
			var idFilms = []
			
			showtimes.forEach(item=>{
				idFilms.push(item.idFilm)
			})
				//console.log(idFilms)
			let uniqueSet = new Set(idFilms);
			idFilms = [...uniqueSet]

			let i = 0
			var filmOfShows =[]
			while(i < idFilms.length){

				let showtime = await ShowTimes.findAll({
					raw:false,
					where:{
						date: date,
						idFilm:idFilms[i]
					},
					include:{
						model: Films,
						as:'film',
						required:false
					}
				})
				filmOfShows.push({
					idFilm:idFilms[i],
					showtime:showtime
				})
				i++
			}
			res.render('contents/showtime_content',{showtimes:showtimes,idFilms:idFilms,filmOfShows:filmOfShows})
		}
		else 
		res.send('Khong co suat chieu')	
	}
}
export default functions;