define([

  // Libs
  'backbone',

  // Deps
  '../models/OrderPositionSerialNumber'

], function(Backbone, OrderPositionSerialNumber) {
	
	 var OrderPositionSerialNumberList = Backbone.Collection.extend({
	 	  model: OrderPositionSerialNumber,
	 	  initialize:function(){
				 console.log('OrderPositionSerialNumberList initialize');  	 		  
	 	  }
	 });

  return OrderPositionSerialNumberList;

});