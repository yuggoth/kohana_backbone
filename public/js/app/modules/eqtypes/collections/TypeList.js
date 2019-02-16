define([

  // Libs
  'backbone',

  // Deps
  '../models/Type'

], function(Backbone, Type) {
	var TypeList = Backbone.Collection.extend({
		  model: Type,
		  url: '/eqtypes/collection'
		});

  return TypeList;

});