define([

  // Libs
  'backbone',
  '../collections/OrderPositionTypeList',
  // Deps
  './OrderPositionTypeView'

], function(Backbone, OrderPositionTypeList,OrderPositionTypeView) {

	 var OrderPositionTypeListView = Backbone.View.extend({
			tagName: 'select',
			className: 'position_equipment_type',
			attributes: {
				"style" : "width:200px; margin-left:30px"
			},
	  
	     initialize: function() {
			 console.log('OrderPositionTypeListView initialize');  	    	 
	     },
		   
	   render: function() {
			//создаем экземпляр коллекции компаний	
			eqtypes = new OrderPositionTypeList(eqtypes_data);
	        eqtypes.forEach(function(model) {
	        	if (this.model === model.attributes.id) {
		            var view = new OrderPositionTypeView({model: model,attributes:{
						"selected" : "selected"
					},id:model.attributes.id});			        		
	        	} else {
	            var view = new OrderPositionTypeView({model: model,id:model.attributes.id});
	        	}
	            this.$el.append(view.render().el);
	            
	        }, this);
		//	  this.$el.html(this.template({eqtypes : this.collection.toJSON()}));
			  return this;
		 },
	  
	 });	

  return OrderPositionTypeListView;

});