'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//===============PASSPORT=================

// passport.use('local-signin', new LocalStrategy(
//   {passReqToCallback : true}, 
//   function(req, username, password, done) {
//     funct.localAuth(username, password)
//     .then(function (user) {
//       if (user) {
//         console.log("LOGGED IN AS: " + user.username);
//         req.session.success = 'You are successfully logged in ' + user.username + '!';
//         done(null, user);
//       }
//       if (!user) {
//         console.log("COULD NOT LOG IN");
//         req.session.error = 'Could not log user in. Please try again.'; 
//         done(null, user);
//       }
//     })
//     .fail(function (err){
//       console.log(err.body);
//     });
//   }
// ));
