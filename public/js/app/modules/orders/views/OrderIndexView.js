define([

  // Libs
  'jqueryUI',
  'backbone',  
  '../collections/OrdersList',
  '../views/OrderView',  
  '../views/OrdersListView',  
  '../views/PaginatedView',  
  'text!../templates/orders-index-view-template.html'
  
], function(jqueryUI,Backbone,OrdersList,OrderView,OrdersListView, PaginatedView,Template) {

	var OrderIndexView = Backbone.View.extend({
		
		el: $("#content"),
		
		template: _.template(Template),	
		
		events : {
			"change #invoice_number" : "filterParameter",
			"change #invoice_date" : "filterParameter",
			"click #all_orders" : "filterParameter"
		},
		
		initialize: function() {  			
			this.$el.html(Template);
			window.orders = new OrdersList;
			window.orders.pager();
			var view = new PaginatedView({collection:window.orders});
	   	    $("#pagination").html(view.render());
			window.orders.on('all', this.render, this);
		},
		
		render: function() {
			console.log('OrderIndexView render');
			var collview = new OrdersListView({collection:window.orders});
			$("#table_orders_index").html(collview.render().el);
			this.$el.find(".datepicker").datepicker({dateFormat:'dd/mm/yy',changeMonth: true,changeYear: true});			
		},	
		
		filterParameter: function() {
			window.orders.perPage = 10;
			window.orders.currentPage = 1;			
			window.orders.pager();
		}

		});

  return OrderIndexView;

});