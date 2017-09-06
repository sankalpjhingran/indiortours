'use strict';
//Including dependency
var path = require('path');
var fs        = require("fs");
var Sequelize = require('sequelize');
var crypto = require('crypto');
var DataTypes = require("sequelize");

var pe = process.env || process.NODE_ENV;

console.log('====>6 ' + pe);
console.log('====>6 ' + JSON.stringify(pe));
var sequelize;
//pe.DATABASE_URL
  //Setting up the config

  var sequelize = new Sequelize('postgres://eqyftdnqqogabd:d1f36b24ce55df93fa72221961b1a9f9328600fceaec3b081c223834a6a65b9b@ec2-23-23-222-147.compute-1.amazonaws.com:5432/de5ml9a574vklj', {
    port: pe.PORT,
    dialect: 'postgres',
    dialectOptions: { ssl: true },
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
});

//Checking connection status
sequelize.authenticate()
    .then(function () {
        console.log("Connected to MySql!");
    })
    .catch(function (err) {
        console.log("Connection Unsuccessful " + err);
    })
    .done();

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    module.exports[model.name] = model;
  });


// export connection
module.exports.sequelize = sequelize;
