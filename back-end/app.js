var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//-------- enrutamiento del admin--------------------
var objetosRouter=require('./routes/api')

var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var mongoose=require('mongoose');
var bodyParser =require('body-parser');
var passport=require('passport');
var passportConfig=require('./config/passport');
var MONGO_URL= 'mongodb://127.0.0.1:27017/auth';

//-------------------------------------------
var app = express();
app.use(cors());

mongoose.Promise=global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(err)=>{
  throw err;
  process.exit(1);
})

// creando un usuario de prueba
/*
const Usuario=require('./modelos/Usuarios');
const u=new Usuario({
  email: 'jdvera@espol.edu.ec',
  nombre: 'juan',
  password: '12345'
});

u.save().then(()=>{
  console.log('guardado');
}).catch((error)=>{
  console.log(error);
});
*/
//aplico la sesion
app.use(session({
  secret: 'ESTO ES UN SECRETO',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: MONGO_URL,
    autoReconnect: true
  })
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api',objetosRouter);
app.use('/users', usersRouter);

//---------------------------------------------------

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
app.get('/',(req,res)=>{
  if(req.session){
    req.session.cuenta+=1
  }else{
    req.session.cuenta=1
  }
  res.send(`Hola! has visto esta pagina: ${req.session.cuenta}`)
});

*/
const controladorUsuario=require('./controladores/usuario');
app.post('/signup',controladorUsuario.postSignup);
app.post('/login',controladorUsuario.postLogin);
app.get('/logout',passportConfig.estaAutenticado,controladorUsuario.logout);

app.get('/usuarioInfo',passportConfig.estaAutenticado,(req,res)=>{
  res.json(req.user);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
