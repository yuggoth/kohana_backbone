define([

  // Libs
  'backbone',
  // Deps
  './OrderPositionSerialNumberView'

], function(Backbone, OrderPositionSerialNumberView) {

	 var OrderPositionSerialNumberListView = Backbone.View.extend({
		  
	     initialize: function() {
		     console.log('OrderPositionSerialNumberListView initialize');	 
	     },
	  
	     render: function() {	
		        this.collection.forEach(function(model) {
		            var view = new OrderPositionSerialNumberView({model: model});
		            this.$el.append(view.render().el);
		            
		        }, this);
	  
	         return this;
	     },
	  
	 });	

  return OrderPositionSerialNumberListView;

});