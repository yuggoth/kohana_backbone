define([

  // Libs
  'backbone',

  // Deps
  '../models/Role'

], function(Backbone, Role) {
	
	var RoleList = Backbone.Collection.extend({
		  model: Role,
		  url: '/auth/getallroles'
		});	

  return RoleList;

});