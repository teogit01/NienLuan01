module.exports.login = function(req,res,next){
	var errors = [];
	if (!req.body.user){
		errors.push('Name is require.');
	}
	if (errors.length){
		res.render('auth/login',{
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}