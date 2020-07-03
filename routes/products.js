var express = require ('express');
var router = express.Router();
var mongoDB = 'mongodb://localhost:27017/';
let MongoClient = require('mongodb').MongoClient;

// GET route for retrieving products
router.get('/v1/products', async function(req, res) {
    MongoClient.connect(mongoDB, function(err, db) {
      if (err) throw err;
      var dbo = db.db("HEB");
      let filterType = req.query && req.query.type
  
      // Switch search based on user-selected type
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

  module.exports = router;