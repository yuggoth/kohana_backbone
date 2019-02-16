define([

  // Libs
  'backbone',     
  'text!../templates/order-dialog-template.html'

], function(Backbone,Template) {

	 var OrderDialogView = Backbone.View.extend({

		   template: _.template(Template),

		   events: {

		   },

		   initialize: function() {

		   },

		   render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     return this;
		   },

		 }); 		

  return OrderDialogView;

});