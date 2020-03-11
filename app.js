import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

//import routes
import authRoutes from './routes/auth';
import authMiddleware from './middlewares/auth';
import indexRoutes from './routes/index';
import cinemaRoutes from './routes/cinemaRoute';
import showtimeRoutes from './routes/showtimeRoute';

//import validatorLogin from './validators/validator.login';

const app = express();
const port = 3000;

//setup bodyParser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// setup express-session
app.use(cookieParser('secret'));
app.use(session({cookie:{maxAge:null}}));

//set up ejs
app.use(express.static('public'));
app.set('views','./views');
app.set('view engine', 'ejs');

//use routes
app.use('/login',authRoutes);
app.use('/logout',function(req,res){
	res.clearCookie('admin');
	//res.send(req.cookies.admin);
	res.redirect('/login');
});

// setup expressLayouts
app.use(expressLayouts);

app.use('/',authMiddleware.requireAuth,indexRoutes);

app.use('/cinemas',authMiddleware.requireAuth,cinemaRoutes);
app.use('/showtimes',authMiddleware.requireAuth,showtimeRoutes);

app.listen(port,function(){
	console.log("Server Start port 3000")
});

export default app;