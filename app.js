var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require ('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Connect Mongoose to mongoDB for searching/sorting
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/';
let MongoClient = require('mongodb').MongoClient;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();

// Set up CORS options to whitelist localhost
var whitelist = ['http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoint to GET documents from "products" collection in "HEB" database
app.get('/v1/products', async function(req, res) {
  MongoClient.connect(mongoDB, function(err, db) {
    if (err) throw err;
    var dbo = db.db("HEB");
    let filterType = req.query && req.query.type

    // Switch 
    switch(filterType) {
      case 'description':
        dbo.collection("products").find({
          Description: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
      case 'shelf_life':
        dbo.collection("products").find({
          ShelfLife: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
      case 'department':
        dbo.collection("products").find({
          Department: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
      case 'last_sold':
        dbo.collection("products").find({
          lastSold: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
      case 'price':
        dbo.collection("products").find({
          Price: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
      case 'unit':
        dbo.collection("products").find({
          Unit: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
      case 'cost':
        dbo.collection("products").find({
          Cost: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
      case 'id':
          dbo.collection("products").find({
            ID: { $regex: req.query.searchValue, $options: "i" }
          }).toArray(function(err, result) {
            if (err) throw err;
            res.status(200).send({
              success: 'true',
              message: 'Your request was successful',
              result: result
            });
            db.close();
          });
          break;
      default:
        dbo.collection("products").find({
          Description: { $regex: req.query.searchValue, $options: "i" }
        }).toArray(function(err, result) {
          if (err) throw err;
          res.status(200).send({
            success: 'true',
            message: 'Your request was successful',
            result: result
          });
          db.close();
        });
        break;
    }
  });
}); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
