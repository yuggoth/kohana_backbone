define([

  // Libs
  'backbone',

  // Deps
  '../models/Company'

], function(Backbone, Company) {
	var CompanyList = Backbone.Collection.extend({
		  model: Company,
		  url: '/department/companies'
		});

  return CompanyList;

});