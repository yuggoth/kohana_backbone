define([

  // Libs
  'backbone',

  // Deps
  '../models/OrderPosition'

], function(Backbone, OrderPosition) {
	
	 var OrderPositionList = Backbone.Collection.extend({
			model: OrderPosition,	 
			
		    deleted: function() {
		        return this.filter(function(model){ return model.get('deleted'); });
		    },
		      
			prihod: function() {
			    return this.filter(function(model){ return model.get('prihod'); });
			},  
		 });

  return OrderPositionList;

});	