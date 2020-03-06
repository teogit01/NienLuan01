const functions = {
	getLogin : (req,res)=>{
		res.render('auth/login');
	},
	postLogin : (req,res)=>{
		let {user, pass} = req.body;
		if(user != 'admin' || pass != 'admin'){
			res.render('auth/login');
			return;
		} 
			res.cookie('admin','admin');
			res.redirect('/cinemas/');
		
	}	

}

export default functions;
