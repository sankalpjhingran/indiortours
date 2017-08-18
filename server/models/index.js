'use strict';
//Including dependency
var path = require('path');
var fs        = require("fs");
var Sequelize = require('sequelize');
var crypto = require('crypto');
var DataTypes = require("sequelize");
require('dotenv').config();

var pe = process.env;
console.log('====>6 ' + pe);
console.log('====>6 ' + JSON.stringify(pe));
const pguser = pe.PGUSER;
const pgpass = pe.PGPASS;
const pghost = pe.PGHOST;
const pgport = pe.PGPORT;
const pgdatabase = pe.PGDATABASE;
console.log('====>1 ' + pguser);
console.log('====>2 ' + pgpass);
console.log('====>3 ' + pghost);
console.log('====>4 ' + pgport);
console.log('====>5 ' + pgdatabase);
console.log('====>6 ' + process.env.HEROKU_POSTGRESQL_BRONZE_URL);

const defaultDbUrl = 'postgres://' + pguser + ':' + pgpass + '@' + pghost +
 ':' + pgport + '/' + pgdatabase;

  //Setting up the config
  var sequelize = new Sequelize(process.env.HEROKU_POSTGRESQL_BRONZE_URL, {
    port: 5432,
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
