define([

  // Libs
  'backbone',
  'text!../templates/error-template.html'  
  
  
], function(Backbone,Template) {

	 var ErrorView = Backbone.View.extend({
	 	 tagName: "div",
		 className: "error_view",
		 template: _.template(Template),			  
	     initialize: function() {
	     },

	     render: function() {
		     this.$el.html(this.template({model:this.model}));
	         return this;
	     },
	  
	 });
	
  return ErrorView;

});