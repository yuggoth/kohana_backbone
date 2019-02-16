define([

  // Libs
  'backbone',
  'text!../templates/order-edit-company-template.html'

], function(Backbone, Template) {

	 var OrderCompanyView = Backbone.View.extend({
		   tagName: "option",
		   className: "",
		   template: _.template(Template),

		   events: {
		   },

		   initialize: function() {
				 console.log('OrderCompanyView initialize');  			   
			 this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     return this;
		   },

		 });	

  return OrderCompanyView;

});