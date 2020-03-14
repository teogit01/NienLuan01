
import Films from '../models/film';
const functions = {
	index : (req,res)=>{
		res.render('showtimes/index');
	},
	getAdd : async(req,res)=>{
		let days =['Sunday','Monday','Tusday','Wednesday','Thursday','Friday','Saturday']
		let films = await Films.findAll({
			where: {
				status: 1
			}
		},{
			attributes: ['id','name'],
		},{
			order:[
				['name','ASC']
			]
		})

		res.render('showtimes/add',{days:days,films:films});
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
		res.send({
			day: day,
			days: days
		})
	},
	setActive : async(req,res)=>{
		
		var actives = []
		var dayOfWeeks = []
		let today = new Date()
		let theDay = today.getDay()
		//let theDay = 0

		let i = 0
		var nextDay = 0
		
		// i_7 ngay trong tuan
		while (i<=6){	
			if (i == theDay){
				actives.push('active')
				i++

				for (let j = theDay; j<=6; j++ ){
					let day = today.getDate() + nextDay
					//let day = 31
					let month = today.getMonth() + 1
					//let month = 3
					let year = today.getFullYear()

					nextDay++
					// Kiem tra hop le cua moi ngay mai
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
					}else
					if (((month==1)||(month==3)||(month==5)||(month==7)||(month==8)
						||(month==10)||(month==12)) && (day == 31)){
						
						day = 1
						month++
						year = today.getFullYear()
						if (month==13) {
							month = 1
							year = today.getFullYear()+1
						}
						
					}else
					if (((month==4)||(month==6)||(month==9)||(month==11))&&(day==30)){
						day = 1
						month ++
						year = today.getFullYear()
					}
					
					day = day++
					month = month
					year = year
					
					dayOfWeeks.push({
						day:day,
						month:month,
						year:year
					})
				}

				var d_sunday = today.getDate() + nextDay
				var m_sunday = today.getMonth() + 1
				var y_sunday = today.getFullYear()

				// Kiem tra hop le cua moi ngay chu nhat
				if (d_sunday == 28 && m_sunday == 2){						
						if (((y_sunday % 4 == 0 )&&(y_sunday % 100 != 0))|| y_sunday %400 ==0 ){
							d_sunday = 29
							m_sunday = 2
							y_sunday = today.getFullYear()
						}
						else {
							
							d_sunday = 1
							m_sunday = 3
							y_sunday = today.getFullYear()
							
						}						
				}else
				if (((m_sunday==1)||(m_sunday==3)||(m_sunday==5)||(m_sunday==7)||(m_sunday==8)
						||(m_sunday==10)||(m_sunday==12)) && (d_sunday == 31)){
						
						d_sunday = 1
						m_sunday++
						y_sunday = today.getFullYear()
						if (m_sunday==13) {
							m_sunday = 1
							y_sunday = today.getFullYear()+1
						}
						
				}else
				if (((m_sunday==4)||(m_sunday==6)||(m_sunday==9)||(m_sunday==11))&&(d_sunday==30)){
						d_sunday = 1
						m_sunday ++
						y_sunday = today.getFullYear()
				}
	
			}else {
				actives.push('0')
				i++
			}
			
		}
		let passDay = 0
		while (i-1 > 0){
			i--
			if(i < theDay){
				passDay++
				//console.log('i',i)
				//console.log('passDay',passDay)
				let day = today.getDate() - passDay
				let month = today.getMonth() + 1
				let year = today.getFullYear()
				//Kiem tra hop le cua ngay hom sau
				if (day == 1 && month == 3){						
						if (((year % 4 == 0 )&&(year % 100 != 0))|| year %400 ==0 ){
							day = 29
							month = 2
							year = today.getFullYear()
						}
						else {
							
							day = 28
							month = 2
							year = today.getFullYear()
							
						}						
				
				}else if (((month==1)||(month==5)||(month==7)||(month==8)
						||(month==10)||(month==12)) && (day == 1)){
						
						day = 30
						month--
						year = today.getFullYear()
						if (month==0) {
							day = 31
							month = 12
							year = today.getFullYear()-1
				
				}

				}else if (((month==4)||(month==6)||(month==9)||(month==11))&&(day==1)){
						day = 31
						month--
						year = today.getFullYear()

				}
				dayOfWeeks.unshift({
					day:day,
					month:month,
					year:year
				})

			}
		}
		dayOfWeeks.unshift({
			day:d_sunday,
			month:m_sunday,
			year:y_sunday
		})
		//console.log(today)
		//console.log(dayOfWeek)
		res.send({
			actives:actives,
			dayOfWeeks:dayOfWeeks
		})
	},
	//post Add
	postAdd : async(req,res)=>{
		res.send(req.body.name)

	}


}
export default functions;