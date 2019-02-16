define([

  // Libs
  'backbone',
  '../collections/EquipmentList',
  '../views/EquipmentListView',  
  '../views/EquipmentView',
  '../views/PaginatedView',
  'text!../templates/equipment-index-template.html'      
  
], function(Backbone,EquipmentList,EquipmentListView,EquipmentView,PaginatedView,Template) {

	var EquipmentIndexView = Backbone.View.extend({
		
		el: $("#content"),

		template: _.template(Template),		
		
		events : {
			"change #equipment_name" : "filterParameter",
			"change #serial_number" : "filterParameter",
			"change #equipment_type" : "filterParameter",	
			"click #all_spis" : "filterParameter",	
			"click #all_otkr" : "filterParameter",				
		},
		
		initialize: function() {
			this.$el.html(Template);
			window.equipment = new EquipmentList();
			window.equipment.pager();
			var view = new PaginatedView({collection:window.equipment});
	   	    $("#pagination").html(view.render());
			window.equipment.on('all', this.render, this);
		},
		
		render: function() {
			var collview = new EquipmentListView({collection:window.equipment});
			$("#equipment_table").html(collview.render().el);
		},			
		  
		filterParameter: function() {
			window.equipment.perPage = 10;
			window.equipment.currentPage = 1;			
			window.equipment.pager();
		}		  


		});

  return EquipmentIndexView;

});