// User.js
"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
		id: {type: DataTypes.STRING, primaryKey: true},
        firstName: {type: DataTypes.STRING},
        lastName: {type: DataTypes.STRING},
        username: {type: DataTypes.STRING},
        password: DataTypes.STRING
  });

  return User;
};