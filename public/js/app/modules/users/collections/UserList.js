define([

  // Libs
  'backbone',

  // Deps
  '../models/User'

], function(Backbone, User) {
	
	var UserList = Backbone.Collection.extend({
		  model: User,
		  url: '/auth/getallusers'
		});

  return UserList;

});