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
		     },
		  
		     render: function() {
					//создаем экземпляр коллекции компаний	
					companies = new OrderCompanyList(departments_data);	
			        var department = this.options.department;
					companies.forEach(function(model) {
				            var view = new OrderCompanyView({model: model,attributes:{"label":model.attributes.name},"department": department});			        		
			            this.$el.append(view.render().el);
			            
			        }, this);
		  
		         return this;
		     },
		  
		 });	

  return OrderCompanyListView;

});