const functions = {
	getLogin : (req,res)=>{
		if (req.signedCookies.admin){
			res.redirect('/');
		}
		res.render('auth/login',{errors:''});
		
	},
	postLogin : (req,res)=>{		
		
		let {user, pass} = req.body;
		if(user != 'admin' || pass != 'admin'){
			res.render('auth/login',{errors:''});
			return;
		} 
			res.cookie('admin','admin',{
				signed: true
			});
			res.redirect('/');
		
	}	

}

export default functions;
