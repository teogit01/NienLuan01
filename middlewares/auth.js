module.exports.requireAuth = function(req,res,next){
	//console.log(req.signedCookies);
	if (!req.signedCookies.admin) {
		res.redirect('/login');
		return;
	}

		next();
};