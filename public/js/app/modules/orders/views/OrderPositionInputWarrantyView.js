define([

  // Libs
  'backbone'

], function(Backbone) {

	 var OrderPositionWarrantyInputView = Backbone.View.extend({
		   tagName: "input",
		   attributes: {"type":"checkbox"},
		   
		   events: {
		   },

		   initialize: function() {
				 console.log('OrderPositionWarrantyInputView initialize');  			   
		   },

		   render: function() {
		     this.$el.html();
		     return this;
		   },

		 });	

  return OrderPositionWarrantyInputView;

});