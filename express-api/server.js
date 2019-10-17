const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const csrf = require("csurf");
const jwt = require("./middleware/jwt");
const cookieParser = require('cookie-parser');
const app = express();
const errorHandler = require('./middleware/error-handler');
var createError = require('http-errors');
const path = require("path");
let port = process.env.PORT || 8005;

app.use(cors({ origin: 'http://localhost:4200' , credentials :  true}));


app.use(cookieParser());
require('dotenv').config({path: __dirname +  "/.env"});

let distDir = path.join(__dirname, "../dist/");
app.use(express.static(distDir));

app.use(jwt());

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

// Setup databse connection
let mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// set up routers
app.use('/api', indexRouter);
app.use('/api/users', userRouter );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("http server starting on port : " + port)
});