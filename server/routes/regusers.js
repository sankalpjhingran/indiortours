'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var models  = require('../models');
var models  = require('../models/index');

/* GET to login route */
router.get('/', function(req, res) {
  console.log('in router regusers...====>');
  //models.User = models.User.build();
  console.log('User saved...');
  models.User.sync();
  //models.User.create({username: 'sankalp', password: 'asdasd', email: 'sankalp.jhingran@gmail.com'}).then(function(){
  models.User.findAll().then(function(users){
    res.json(users);
  });
  //});



 /*
  models.User.retrieveAll(function(users) {
		if (users) {
      console.log(users);
		  res.json(users);
		} else {
		  res.send(401, "User not found");
		}
	  }, function(error) {
		  res.send("User not found " + error);
	  });

    /*
    models.User.retrieveAll()
  	 .then(function(user){
          console.log(result from ng controller);
          console.log(user);
    });
    */

});
module.exports = router;
