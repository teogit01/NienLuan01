import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import bodyParser from 'body-parser';


//import routes
import indexRoutes from './routes/index';
import cinemaRoutes from './routes/cinemaRoute';

const app = express();
const port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.use(expressLayouts);
app.use(express.static('public'));
app.set('views','./views');
app.set('view engine', 'ejs');

//use routes
app.use('/',indexRoutes);
app.use('/cinemas',cinemaRoutes);

app.listen(port,function(){
	console.log("Server Start port 3000")
});

export default app;