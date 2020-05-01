
import Films from '../models/film';
import Rooms from '../models/room';
import ShowTimes from '../models/showtime';
import Schedules from '../models/schedule';
const functions = {
	index : async(req,res)=>{
		let day = new Date().getDate()
		if (day<10)
			day = '0'+day
		let month = new Date().getMonth()+1
		if (month<10)
			month = '0'+month
		let year = new Date().getFullYear()
		let today = day+'/'+month+'/'+year
		//console.log(today)
		const schedule = await Schedules.findOne({
			raw:true,
			where:{
				date:today
			}
		})
		//console.log(schedule.id)
		
		res.render('showtimes/index');
	},
	getAdd : async(req,res)=>{	

		let days =[
			{'day':'Sunday','active':0,'date':''},
			{'day':'Monday','active':0,'date':''},
			{'day':'Tusday','active':0,'date':''},
			{'day':'Wednesday','active':0,'date':'',},
			{'day':'Thursday','active':0,'date':''},
			{'day':'Friday','active':0,'date':''},
			{'day':'Saturday','active':0,'date':''},
		]
		let day = new Date().getDay()
		//let day = 0
		let newDate = new Date().getDate()
		
		days[day].active = 1
		
		let films = await Films.findAll({
			where: {
				status: 1
			}
		},{
			attributes: ['id','name','runTime'],
		},{
			order:[
				['name','ASC']
			]
		})

		let showtimes = await ShowTimes.findAll({
			raw:false,
			include:{
				model: Films,
				as:'film',
				required:false				
			}
		})
		//console.log(req.params.id)
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
						date: '30/03/2020', 
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
		}
		res.render('showtimes/add',{days:days,films:films,idFilms:idFilms,filmOfShows:filmOfShows});
	},
	setDay : async(req,res)=>{

		if (req.body.thday == 1){

		 let today = new Date()
			// let day = today.getDate()
			// let month = today.getMonth()+1
			// let year = today.getFullYear()
			let day = 30
			let month = 3
			let year = 2020
			let dayOfWeeks = []
			
			for (let i=1; i<=7; i++){			
				if (day == 28 && month == 2){						
					if (((year % 4 == 0 )&&(year % 100 != 0))|| year %400 ==0 ){
						day = 29
						month = 2
						year = today.getFullYear()
					}
					else {
						day = 1
						month = 3
						year = today.getFullYear()
					}			
				} 
				if (((month==1)||(month==3)||(month==5)||(month==7)||(month==8)
					||(month==10)||(month==12)) && (day == 32)){

					day = 1
					month++
					year = today.getFullYear()					
				}
				if (month==13) {
					month = 1
					year = today.getFullYear()+1
				} 
				if (((month==4)||(month==6)||(month==9)||(month==11))&&(day==31)){
					day = 1
					month ++
					year = today.getFullYear()
				}

				dayOfWeeks.push({
					day:day,
					month:month,
					year:year
				})
				day = day + 1
			}
			
			dayOfWeeks.unshift({
				day:dayOfWeeks[6].day,
				month:dayOfWeeks[6].month,
				year:dayOfWeeks[6].year
			})	
			//console.log(dayOfWeeks,'ok')
			dayOfWeeks.length = 7; 		
			//console.log(dayOfWeeks)
			res.send(dayOfWeeks)
			return 
		}
		// neu chu nhat
		if (req.body.thday == 0){
			let today = new Date()

			let day = today.getDate()
			let month = today.getMonth()+1
			let year = today.getFullYear()
			// let day = 29
			// let month = 3
			// let year = 2020
			let dayOfWeeks = []

			for (let i=0; i<=6; i++){			
				if (day == 28 && month == 2){						
					if (((year % 4 == 0 )&&(year % 100 != 0))|| year %400 ==0 ){
						day = 29
						month = 2
						year = today.getFullYear()
					}
					else {
						day = 1
						month = 3
						year = today.getFullYear()
					}			
				}

				if (((month==1)||(month==3)||(month==5)||(month==7)||(month==8)
					||(month==10)||(month==12)) && (day == 32)){

					day = 1
					month++
					year = today.getFullYear()					
				}
				if (month==13) {
					month = 1
					year = today.getFullYear()+1
				}

				if (((month==4)||(month==6)||(month==9)||(month==11))&&(day==31)){
					day = 1
					month ++
					year = today.getFullYear()
				}

				dayOfWeeks.push({
					day:day,
					month:month,
					year:year
				})
				day = day + 1
			}	
			//console.log(dayOfWeeks,'ok')
			res.send(dayOfWeeks)
			return 
		}

	},	
	
	getIdSchedule : async(req,res)=>{
		// console.log(req.body.scheduleValue)
		// return
		let schedule = await Schedules.findOne({
			raw: true,
			where:{
				date:req.body.scheduleValue
			}
		})
		if (schedule){
			res.send({
				idSchedule:schedule.id
			})
		}else{

			res.send({
				idSchedule:0
			})
		}
	},
	postSearch : async(req,res)=>{
		//tim tat ca cac name co trong database
		var names = await Films.findAll({
			attributes: ['id','name'],
		});
		console.log(names)
		res.send(names);
	},

	// Set date
	getDay : async(req,res)=>{
		//const  = Number(req.body.current_day)
		//console.log(thu)

		/*
			o => chu nhat
			1 => thu 2
			...	  ...

		*/
		// Truyen days[] cho nguoi dung
		let days = []
		// Lay ngay thang hien tai => Lay ngay
		let today = new Date()
		let day = today.getDay()
		
		//Test
		let testDay = 0//(today) => thu 2
		//new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1))
		
		// Ngay tiep theo trong tuan 
		var nextDay = -1;
		
		/* Neu khong phai chu nhat thi set ngay cho cac ngay trong tuan
			nguoc lai thi chi set ngay chu nhat =  ngay hien tai
		*/
		if (day != 0){
			// Chay cac ngay trong tuan
			for (var i = 1; i <=7; i++){

				// Set ngay hien tai va cac ngay tiep the trong tuan
				if(day <= i){
					nextDay++
					let day = new Date(today.getFullYear(),today.getMonth(),today.getDate()+ nextDay).getDate()
					let month = new Date(today.getFullYear(),today.getMonth(),today.getDate()+ nextDay).getMonth()
					let year = new Date(today.getFullYear(),today.getMonth(),today.getDate()+ nextDay).getFullYear()
					//console.log(new Date(today.getFullYear(),today.getMonth(),today.getDate() + i + 2))
					//days.push(new Date(today.getFullYear(),today.getMonth(),today.getDate()+ i + 2))
					days.push({day:day,month:month,year:year})
				}
				
			}
			// Tra ve client
			res.send({
				day: day,
				days: days
			})
			return;
		}

		// Neu today la ngay chu nhat
		//console.log('testDay',day)
		days.push({day:today.getDate(),month:today.getMonth(),year:today.getFullYear()})

		//console.log(days)
		
		res.send({
			day: day,
			days: days
		})
	},
	setActive : async(req,res)=>{
		
		var dayOfWeeks = []
		let today = new Date()
		let theDay = today.getDay()
		//let theDay = 0

		let i = 0
		var nextDay = 0

		if (theDay == 0){
			console.log(theDay)
		}
		return 
	
		// if (theDay != 0){
		// 	// i_7 ngay trong tuan
		// 	while (i<=6){	
		// 	if (i == theDay){
		// 		actives.push('active')
		// 		i++

		// 		for (let j = theDay; j<=6; j++ ){
		// 			let day = today.getDate() + nextDay
		// 			//let day = 31
		// 			let month = today.getMonth() + 1
		// 			//let month = 3
		// 			let year = today.getFullYear()

		// 			nextDay++
		// 			// Kiem tra hop le cua moi ngay mai
		// 			if (day == 28 && month == 2){						
		// 				if (((year % 4 == 0 )&&(year % 100 != 0))|| year %400 ==0 ){
		// 					day = 29
		// 					month = 2
		// 					year = today.getFullYear()
		// 				}
		// 				else {
							
		// 					day = 1
		// 					month = 3
		// 					year = today.getFullYear()
							
		// 				}						
		// 			}else
		// 			if (((month==1)||(month==3)||(month==5)||(month==7)||(month==8)
		// 				||(month==10)||(month==12)) && (day == 31)){
						
		// 				day = 1
		// 				month++
		// 				year = today.getFullYear()
		// 				if (month==13) {
		// 					month = 1
		// 					year = today.getFullYear()+1
		// 				}
						
		// 			}else
		// 			if (((month==4)||(month==6)||(month==9)||(month==11))&&(day==30)){
		// 				day = 1
		// 				month ++
		// 				year = today.getFullYear()
		// 			}else {
		// 				day = day++
		// 				month = month
		// 				year = year
		// 			}
					
		// 			dayOfWeeks.push({
		// 				day:day,
		// 				month:month,
		// 				year:year
		// 			})
		// 		}

		// 		// Them ngay chu nhat vao
		// 		var d_sunday = today.getDate() + nextDay
		// 		var m_sunday = today.getMonth() + 1
		// 		var y_sunday = today.getFullYear()

		// 		// Kiem tra hop le cua moi ngay chu nhat
		// 		if (d_sunday == 28 && m_sunday == 2){						
		// 				if (((y_sunday % 4 == 0 )&&(y_sunday % 100 != 0))|| y_sunday %400 ==0 ){
		// 					d_sunday = 29
		// 					m_sunday = 2
		// 					y_sunday = today.getFullYear()
		// 				}
		// 				else {
							
		// 					d_sunday = 1
		// 					m_sunday = 3
		// 					y_sunday = today.getFullYear()
							
		// 				}						
		// 		}else
		// 		if (((m_sunday==1)||(m_sunday==3)||(m_sunday==5)||(m_sunday==7)||(m_sunday==8)
		// 				||(m_sunday==10)||(m_sunday==12)) && (d_sunday == 31)){
						
		// 				d_sunday = 1
		// 				m_sunday++
		// 				y_sunday = today.getFullYear()
		// 				if (m_sunday==13) {
		// 					m_sunday = 1
		// 					y_sunday = today.getFullYear()+1
		// 				}
						
		// 		}else
		// 		if (((m_sunday==4)||(m_sunday==6)||(m_sunday==9)||(m_sunday==11))&&(d_sunday==30)){
		// 				d_sunday = 1
		// 				m_sunday ++
		// 				y_sunday = today.getFullYear()
		// 		}
	
		// 	}else {
		// 		actives.push('0')
		// 		i++
		// 	}
			
		// 	}
		// 	let passDay = 0
		// 	while (i-1 > 0){
		// 	i--
		// 	if(i < theDay){
		// 		passDay++
		// 		//console.log('i',i)
		// 		//console.log('passDay',passDay)
		// 		let day = today.getDate() - passDay
		// 		let month = today.getMonth() + 1
		// 		let year = today.getFullYear()
		// 		//Kiem tra hop le cua ngay hom truoc
		// 		if (day == 1 && month == 3){						
		// 				if (((year % 4 == 0 )&&(year % 100 != 0))|| year %400 ==0 ){
		// 					day = 29
		// 					month = 2
		// 					year = today.getFullYear()
		// 				}
		// 				else {
							
		// 					day = 28
		// 					month = 2
		// 					year = today.getFullYear()
							
		// 				}						
				
		// 		}else if (((month==1)||(month==5)||(month==7)||(month==8)
		// 				||(month==10)||(month==12)) && (day == 1)){
						
		// 				day = 30
		// 				month--
		// 				year = today.getFullYear()
		// 				if (month==0) {
		// 					day = 31
		// 					month = 12
		// 					year = today.getFullYear()-1
				
		// 		}

		// 		}else if (((month==4)||(month==6)||(month==9)||(month==11))&&(day==1)){
		// 				day = 31
		// 				month--
		// 				year = today.getFullYear()

		// 		}
		// 		dayOfWeeks.unshift({
		// 			day:day,
		// 			month:month,
		// 			year:year
		// 		})

		// 	}
		// 	}
		// 	// Them ngay chu nhat vao dung vi tri
		// 	dayOfWeeks.unshift({
		// 		day:d_sunday,
		// 		month:m_sunday,
		// 		year:y_sunday
		// 	})
		// } 
		// Neu hom nay la thu nhat thi set DATE tuan moi
		// else {
		// 	let i = 0
		// 	while (i<=6){
		// 		let day = today.getDate() + i
		// 		let month = today.getMonth()+1
		// 		let year = today.getFullYear()

		// 		if (day == 28 && month == 2){						
		// 				if (((year % 4 == 0 )&&(year % 100 != 0))|| year %400 ==0 ){
		// 					day = 29
		// 					month = 2
		// 					year = today.getFullYear()
		// 				}
		// 				else {
							
		// 					day = 1
		// 					month = 3
		// 					year = today.getFullYear()
							
		// 				}						
		// 		}else
		// 			if (((month==1)||(month==3)||(month==5)||(month==7)||(month==8)
		// 				||(month==10)||(month==12)) && (day == 31)){
						
		// 				day = 1
		// 				month++
		// 				year = today.getFullYear()
		// 				if (month==13) {
		// 					month = 1
		// 					year = today.getFullYear()+1
		// 				}
						
		// 			}else
		// 			if (((month==4)||(month==6)||(month==9)||(month==11))&&(day==30)){
		// 				day = 1
		// 				month ++
		// 				year = today.getFullYear()
		// 			}else {
		// 				day = day++
		// 				month = month
		// 				year = year
		// 			}

		// 		dayOfWeeks.push({
		// 			day: day,
		// 			month: month,
		// 			year: year
		// 		})
		// 		i++
		// 	}
		// }

		//console.log(today)
		//console.log(dayOfWeeks)
		dayOfWeeks.filter(day=>{
			if(day.month < 10)
				day.month = '0'+day.month
			if(day.day < 10)
				day.day = '0'+day.day
		})
		// console.log(dayOfWeeks)
		// return

		res.send({
			theDay:theDay,
			actives:actives,
			dayOfWeeks:dayOfWeeks
		})
	},
	//post Add
	postAdd : async(req,res)=>{

		let { start, end } = req.body
		let idFilm = parseInt(req.body.idFilm)
		let idRoom = parseInt(req.body.idRoom)	
		let date = req.body.idSchedule
		try {
			let record = await ShowTimes.create({
				start,
				end,
				date,
				idFilm,
				idRoom
			},{
				fields: ['start','end','date','idFilm','idRoom'],
			})
			
			if(record){
				req.session.message = ({
					type : 'success',
					message : 'Insert Successfully!'
				})
			} else {
				req.session.message = ({
					type : 'danger',
					message : 'Insert Error!!'
				})
			}
		} catch (error){
			// req.session.message = ({
			// 	type : 'danger',
			// 	message : 'Insert Error!!'
			// })
			res.json({
				error: error
			})
			//res.redirect('back')
		}
		res.redirect('back')
	},
	//Set time start for Showtime
	setTimeStart : async(req,res)=>{
		let time = req.body.start

		let index = time.indexOf(':')
		let hour = parseInt(time.slice(0,index))
		let minute = parseInt(time.slice(index+1,time.length))
		//console.log(req.body.idSchedule)
	
		// let schedules = await Schedules.findOne({
		// 	raw:true,
		// 	where:{
		// 		date:req.body.idSchedule
		// 	},
		// 	fields: ['day']
		// })
		// console.log(idSchedule.id)
		// return
	
		//var idSchedule = schedules.id
		// console.log(idSchedule)
		//return

		let idFilm = parseInt(req.body.idFilm)
		
		let startHour= hour
		let startMinute= minute
		
		if (hour < 10){
			startHour = '0'+hour
		}if (minute < 10){
			startMinute = '0'+minute
		}
		var start = startHour+ ':' +startMinute
		let afilm = await Films.findOne({
			where: {
				id: idFilm,
			}
		})
		if (!afilm){
			console.log("Khong co phim")
			return 
		}

		var runTime = afilm.runTime

		// xy ly tu dong tinh gio ket thuc

		let endHour = hour + Math.floor(runTime/60)
		let endMinute = minute + runTime % 60
		if (endMinute >= 60){
			endMinute = endMinute % 60
			endHour++
		}		

		if (endHour < 10){
			endHour = '0'+endHour
		}
		if (endMinute < 10){
			endMinute = '0'+endMinute
		}

		var end = endHour+ ':' +endMinute				
		
		var idRooms = []
		//console.log('----tat ca thoi gian bat dau-----')
		
		for (let i=1;i<=5;i++){
			let showtimes = await ShowTimes.findAll({
				raw: true,
				where:{
					idRoom: i,
					date: req.body.date
				},
				attributes:['start','end','idRoom'],			
			})

			//console.log('----------------------------------',i,'--------------------------------------------------')
			if (showtimes.length>0){
				//console.log(showtimes)
				//console.log('------Khong kha dung-------')
				let unavailable = []
				showtimes.forEach(item=>{
					let hourEnd = parseInt(item.end)
					let hourStart = parseInt(item.start)
					for (let j = hourStart; j<=hourEnd; j++){
						unavailable.push(j)			
					}
				})
				let uniqueSet = new Set(unavailable);
				unavailable = [...uniqueSet]
				//console.log(unavailable)

				//console.log('------gio------')
				
				if (unavailable.indexOf(parseInt(start.slice(0,2)))==-1){
					if (unavailable.indexOf(parseInt(end.slice(0,2)))==-1){
						//console.log('Them IDROOM')
						idRooms.push(i)
					}
					// else{
					// 	//console.log('Khong Them')
					// }
				}
				// else {
				// 	//console.log('Khong Them')
				// }
				//console.log('----thoi gian muon them-----')
				//console.log(start)
				//console.log(runTime)
				//console.log(end)
			}else {
				//Room chua co suat chieu thi them vao
				idRooms.push(i)
			}
			
				
		}
		//console.log(idRooms)
		
		res.send({
			start:start,
			end:end,
			idFilm: idFilm,
			runTime: runTime,
			idRooms:idRooms
		})
	}

}
export default functions;