define([

  // Libs
  'backbone',
  '../collections/OrderCompanyList',
  // Deps
  './OrderCompanyView'

], function(Backbone, OrderCompanyList, OrderCompanyView) {

	 var OrderCompanyListView = Backbone.View.extend({
			tagName: 'select',
			className: '',
			attributes: {
				"style" : "width:200px",
				"name" : "company"
			},
		  
		     initialize: function() {
				 console.log('OrderCompanyListView initialize');  		    	 
		     },
		  
		     render: function() {
					//создаем экземпляр коллекции компаний	
					companies = new OrderCompanyList(companies_data);	
			        companies.forEach(function(model) {
			        	if (this.model.attributes.id === model.attributes.id) {
				            var view = new OrderCompanyView({model: model,attributes:{
								"selected" : "selected"
							},id:model.attributes.id});			        		
			        	} else {
			            var view = new OrderCompanyView({model: model,id:model.attributes.id});
			        	}
			            this.$el.append(view.render().el);
			            
			        }, this);
		  
		         return this;
		     },
		  
		 });	

  return OrderCompanyListView;

});