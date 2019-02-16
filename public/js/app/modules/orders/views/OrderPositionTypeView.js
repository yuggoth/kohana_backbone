define([

  // Libs
  'backbone',
  'text!../templates/order-edit-company-template.html'

], function(Backbone, Template) {

	 var OrderPositionTypeView = Backbone.View.extend({
		   tagName: "option",
		   className: "",
		   template: _.template(Template),
		   
		   events: {

		   },

		   initialize: function() {
				 console.log('OrderPositionTypeView initialize');  			   
		     this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
		     this.$el.html(this.template(this.model.toJSON()));
		     return this;
		   },

		 });	

  return OrderPositionTypeView;

});