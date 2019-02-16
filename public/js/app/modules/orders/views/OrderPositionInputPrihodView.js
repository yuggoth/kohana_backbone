define([

  // Libs
  'backbone'

], function(Backbone) {

	 var OrderPositionInputPrihodView = Backbone.View.extend({
		   tagName: "input",
		   className: "input_prihod",
		   attributes: {"type":"checkbox"},
		   
		   events: {
		   },

		   initialize: function() {
				 console.log('OrderPositionInputPrihodView initialize');  			   
		   },

		   render: function() {
		     this.$el.html();
		     return this;
		   },

		 });	

  return OrderPositionInputPrihodView;

});