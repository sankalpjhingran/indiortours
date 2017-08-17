'use strict';
//Including dependency
var path = require('path');
var fs        = require("fs");
var Sequelize = require('sequelize');
var crypto = require('crypto');
var DataTypes = require("sequelize");

  //Setting up the config
var sequelize = new Sequelize('indiortours', 'root', 'india@123', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: console.log,
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
