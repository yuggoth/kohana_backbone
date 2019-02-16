define([

  // Libs
  'backbone',

  // Deps
  '../models/OrderPositionType'

], function(Backbone, OrderPositionType) {
	
	 var OrderPositionTypeList = Backbone.Collection.extend({
	 	  model: OrderPositionType,
	 	  url: '/orders/geteqtypes',
	 	  initialize:function(){
				 console.log('OrderPositionTypeList initialize');  	 		  
	 	  }
	 });

  return OrderPositionTypeList;

});