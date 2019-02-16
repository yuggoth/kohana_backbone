define([

  // Libs
  'backbone'

], function(Backbone) {

	 var OrderPositionPoInputView = Backbone.View.extend({
		   tagName: "input",
		   attributes: {"type":"checkbox"},
		   
		   events: {
		   },

		   initialize: function() {
				 console.log('OrderPositionPoInputView initialize');  			   
		   },

		   render: function() {
		     this.$el.html();
		     return this;
		   },

		 });	

  return OrderPositionPoInputView;

});