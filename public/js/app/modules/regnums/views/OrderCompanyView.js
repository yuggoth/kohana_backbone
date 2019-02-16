define([

  // Libs
  'backbone',
  '../collections/RegnumDepartmentList', 
  '../views/RegnumDepartmentView'

], function(Backbone, RegnumDepartmentList, RegnumDepartmentView) {

	 var OrderCompanyView = Backbone.View.extend({
		   tagName: "optgroup",
		   className: "",

		   events: {
		   },

		   initialize: function() {
			 this.model.bind('change', this.render, this);
		     this.model.bind('destroy', this.remove, this);
		   },

		   render: function() {
				//создаем коллекцию подразделений	
			   this.model.get("departments").forEach(function(model) {
		        	if (this.options.department === model.attributes.id) {
			            var view = new RegnumDepartmentView({model: model,attributes:{
							"selected" : "selected","value":model.attributes.id
						}});			        		
		        	} else {
		            var view = new RegnumDepartmentView({model: model,attributes:{
						"value":model.attributes.id
					}});
		        	}
		            this.$el.append(view.render().el);
		            
		        }, this);		     
		     return this;
		   },

		 });	

  return OrderCompanyView;

});