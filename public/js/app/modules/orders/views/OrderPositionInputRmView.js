define([

  // Libs
  'backbone'

], function(Backbone) {

	 var OrderPositionInputRmView = Backbone.View.extend({
		   tagName: "input",
		   attributes: {"type":"checkbox"},
		   
		   events: {
		   },

		   initialize: function() {
				 console.log('OrderPositionInputRmView initialize');  			   
		   },

		   render: function() {
		     this.$el.html();
		     return this;
		   },

		 });	

  return OrderPositionInputRmView;

});