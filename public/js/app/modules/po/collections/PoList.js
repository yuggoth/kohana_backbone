define([

  // Libs
  'backbone',

  // Deps
  '../models/Po'

], function(Backbone, Po) {
	
	 var PoList = Backbone.Collection.extend({
			model: Po,	 
			url: '/po/getallpo', 

		 });

  return PoList;

});	