define([

  // Libs
  'backbone'

], function(Backbone) {

	 var OrderPositionInputSNView = Backbone.View.extend({
		   tagName: "input",
		   attributes: {"type":"checkbox"},
		   
		   events: {
		   },

		   initialize: function() {
				 console.log('OrderPositionInputSNView initialize');  			   
		   },

		   render: function() {
		     this.$el.html();
		     return this;
		   },

		 });	

  return OrderPositionInputSNView;

});