function index(req,res){
	res.render('index');
}
function index2(req,res){
	res.render("test/index2");
}

export default {index,index2};