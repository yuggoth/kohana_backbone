define([

  // Libs
  'backbone',

  // Deps
  '../models/Department'

], function(Backbone, Department) {

	var DepartmentList = Backbone.Collection.extend({
		  model: Department,
		  url: '/department/collection'
		});

  return DepartmentList;

});