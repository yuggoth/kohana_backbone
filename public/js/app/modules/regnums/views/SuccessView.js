define([

  // Libs
  'backbone',
  'text!../templates/success-template.html'  
  
  
], function(Backbone,Template) {

	 var SuccessView = Backbone.View.extend({
	 	 tagName: "div",
		 className: "success_view",
		 template: _.template(Template),			  
	     initialize: function() {
	     },

	     render: function() {
		     this.$el.html(this.template({model:this.model}));
	         return this;
	     },
	  
	 });
	
  return SuccessView;

});