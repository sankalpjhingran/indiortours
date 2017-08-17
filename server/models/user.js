"use strict";

var sequelize  = require('../models/index');


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.UUID,
    email: {type: DataTypes.STRING, validate: {isEmail: true}},
    type: {type: DataTypes.ENUM, values: ['Direct Customer', 'DMC', 'Tour Operator', 'Travel Agent'], defaultValue: 'Direct Customer', allowNull: false}
  },
  {
    instanceMethods: {
          retrieveAll: function(onSuccess, onError) {
            console.log('In retrieveAll method=====>');
        		User.findAll({attributes:['username']}).then(function(users){
                users.forEach(function(user){
                    console.log(user.dataValues);
                });
            });
      	  },

          retrieveById: function(user_id, onSuccess, onError) {
        		User.find({where: {id: user_id}}, {raw: true})
        			.success(onSuccess).error(onError);
      	  },

          add: function(onSuccess, onError) {
        		var username = this.username;
        		var password = this.password;

        		var shasum = crypto.createHash('sha1');
        		shasum.update(password);
        		password = shasum.digest('hex');

        		User.build({ username: username, password: password })
        			.save().success(onSuccess).error(onError);
      	  },

    	    updateById: function(user_id, onSuccess, onError) {
        		var id = user_id;
        		var username = this.username;
        		var password = this.password;

        		var shasum = crypto.createHash('sha1');
        		shasum.update(password);
        		password = shasum.digest('hex');

        		User.update({ username: username,password: password},{where: {id: id} })
        			.success(onSuccess).error(onError);
    	  },

        removeById: function(user_id, onSuccess, onError) {
    		  User.destroy({where: {id: user_id}}).success(onSuccess).error(onError);
    	  }
    }
}
);
  return User;
};
