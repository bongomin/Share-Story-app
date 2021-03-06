var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var logger = require('morgan');
var hbs = require('express-handlebars');
var passport = require('passport'); 
var session = require('express-session');

// Load  models 
require('./models/User');
require('./models/Story');

// passport config
require('./config/passport')(passport);

// importing the Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth = require('./routes/auth');
var storyRouter= require('./routes/stories');

// lod keys
var keys = require('./config/keys');
// Handlebars Helpers hbs
var {
  truncate,
  stripTags,
  formatDate,
  select,
  editIcon 
} = require('./helpers/hbs');

// map global promise
mongoose.Promise = global.Promise;

// mongodb connections 

mongoose.connect(keys.mongoURI, {
  // useMongoClient:true
  useNewUrlParser: true
})
.then(() => console.log('mongodb connected buddy !!!'))
.catch(err => console.log(err));


var app = express();

// body-paser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Method Override middleware
app.use(methodOverride('_method'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middleware for locating the partial file
app.engine('hbs', hbs({
  helpers :{
    truncate : truncate,
    stripTags : stripTags,
    formatDate:formatDate,
    select : select,
    editIcon : editIcon

  },
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: [
    //  path to your partials
    path.join(__dirname, 'views/partials'),
  ]
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret', 
  resave: false,
  saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting global varaiable
app.use((req,res,next)=>{
  res.locals.user = req.user || null;
  next();
})

// loaing Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',auth);
app.use('/stories',storyRouter);




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
