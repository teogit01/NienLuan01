module.exports.requireAuth = function(req,res,next){
	//console.log(req.cookies);
	if (!req.cookies.admin) {
		res.redirect('/login');
		return;
	}

		next();
};