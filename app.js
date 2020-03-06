import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';


//import routes
import indexRoutes from './routes/index';
import cinemaRoutes from './routes/cinemaRoute';
import cookieParser from 'cookie-parser';


//import routes
import authRoutes from './routes/auth';
import indexRoutes from './routes/index';
import cinemaRoutes from './routes/cinemaRoute';
import authMiddleware from './middlewares/auth';

const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(expressLayouts);
app.use(cookieParser());

app.use(express.static('public'));
app.set('views','./views');
app.set('view engine', 'ejs');

//use routes
app.use('/',indexRoutes);
app.use('/login',authRoutes);
app.use('/logout',function(req,res){
	res.clearCookie('admin');
	//res.send(req.cookies.admin);
	res.redirect('/login');
});


app.use(expressLayouts);

app.use('/cinemas',authMiddleware.requireAuth,cinemaRoutes);

app.listen(port,function(){
	console.log("Server Start port 3000")
});

export default app;