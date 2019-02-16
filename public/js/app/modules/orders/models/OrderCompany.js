define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	 var OrderCompany = Backbone.RelationalModel.extend({
		 initialize:function(){
			 console.log('OrderCompany initialize');  
		 }
	 });	

  return OrderCompany;

})	