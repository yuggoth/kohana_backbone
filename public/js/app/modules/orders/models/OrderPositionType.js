define([

  // Libs
  'backbone-relational'

], function(BackboneRelational) {

	 var OrderPositionType = Backbone.RelationalModel.extend({
		 initialize:function(){
			 console.log('OrderPositionType initialize');  			 
		 }
	 });

  return OrderPositionType;

})	