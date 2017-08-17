var express = require('express');
var router = express.Router();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

/* POST to login route */
router.post('/', function(req, res, next) {
  //Establish database connection
  //req object has the loginData
  MongoClient.connect("mongodb://localhost:27017/indiortours", function(err, db) {
  if(err) {
    return console.dir(err);
  }

  console.log("connection successful...");
  var loginData = req.body;
  var collection = db.collection('users');
  //var docs = [{mykey:1}, {mykey:2}, {mykey:3}];
  console.log(loginData);
  collection.insert(loginData, {w:1}, function(err, result) {
    if(result){
      res.json({result: "Sucecss"});
    }
    if(err){
        console.log(err);
        res.json({result: "Error creating user"});
    }
  });
  collection.findOne({email:"sankalp.jhingran@gmail.com"}, function(err, item) {
    console.log(item);
  });
});

});
module.exports = router;
