define([

  // Libs
  'backbone',    
  'text!../templates/order-edit-company-template.html'  

], function(Backbone,Template) {

	 var RegnumDepartmentView = Backbone.View.extend({
		   tagName: "option",
		 	
		   template: _.template(Template),
		 	
		   events: {
		   },

		   initialize: function() {
		     this.model.bind('change', this.render, this);
		 //  this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
			 this.$el.html(this.template(this.model.toJSON()));	   	 
		     return this;
		   },
		   

		 }); 		

  return RegnumDepartmentView;

});