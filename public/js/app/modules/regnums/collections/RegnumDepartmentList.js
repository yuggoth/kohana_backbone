define([

  // Libs
  'backbone',

  // Deps
  '../models/RegnumDepartment'

], function(Backbone, RegnumDepartment) {
	
	 var RegnumDepartmentList = Backbone.Collection.extend({
			model: RegnumDepartment
		 });

  return RegnumDepartmentList;

});	