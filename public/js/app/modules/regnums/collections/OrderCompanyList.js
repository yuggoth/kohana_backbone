define([

  // Libs
  'backbone',

  // Deps
  '../models/OrderCompany'

], function(Backbone, OrderCompany) {
	 var OrderCompanyList = Backbone.Collection.extend({
	 	  model: OrderCompany,
	 	  url: '/orders/getcompanies'
	 });

  return OrderCompanyList;

});