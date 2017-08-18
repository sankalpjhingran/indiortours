'use strict';
//Including dependency
var path = require('path');
var fs        = require("fs");
var Sequelize = require('sequelize');
var crypto = require('crypto');
var DataTypes = require("sequelize");
var pe = process.env;

const pguser = pe.PGUSER || 'postgres';
const pgpass = pe.PGPASS || 'postgres';
const pghost = pe.PGHOST || 'localhost';
const pgport = pe.PGPORT || defaultPostgresPort;
const defaultDbUrl = 'postgres://' + pguser + ':' + pgpass + '@' + pghost +
 ':' + pgport + '/' + pgdatabase;
const pgdatabase = pe.PGDATABASE || 'focusdb';

  //Setting up the config
  var sequelize = new Sequelize(defaultDbUrl, {
    host: pe.PGHOST,
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
