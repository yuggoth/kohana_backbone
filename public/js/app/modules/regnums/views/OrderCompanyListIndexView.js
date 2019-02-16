define([

  // Libs
  'backbone',
  '../collections/OrderCompanyList',
  // Deps
  './OrderCompanyView'

], function(Backbone, OrderCompanyList, OrderCompanyView) {

	 var OrderCompanyListIndexView = Backbone.View.extend({
			tagName: 'select',
			className: '',
			attributes: {
				"style" : "width:200px",
				"name" : "company"
			},
		  
		     initialize: function() {
		     },
		  
		     render: function() {
		    	 	
					//создаем экземпляр коллекции компаний	
					companies = new OrderCompanyList(departments_data);	
			        var department = this.options.department;
			        this.$el.append('<option value="0">- не важно-</option>');
					companies.forEach(function(model) {
						if (department !== '0') {
						var view = new OrderCompanyView({model:model,attributes:{"label":model.attributes.name,"selected":"selected"},"department":department});
						} else {
				        var view = new OrderCompanyView({model: model,attributes:{"label":model.attributes.name},"department": department});			        		
						}
				        this.$el.append(view.render().el);
			        }, this);
		  
		         return this;
		     },
		  
		 });	

  return OrderCompanyListIndexView;

});